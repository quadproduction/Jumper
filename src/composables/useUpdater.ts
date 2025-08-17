import { getCurrentWindow, getAllWindows } from '@tauri-apps/api/window'

import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { relaunch } from '@tauri-apps/plugin-process'
import { getVersion } from '@tauri-apps/api/app'
import { invoke } from '@tauri-apps/api/core'
import { Update, check as checkUpdates } from '@tauri-apps/plugin-updater'
import { ref, h } from 'vue'

import jumper from '@/services/jumper'
import { useToast, ToastAction } from '@@materials/ui/toast'

type UpdateInfo = {
  rid: number
  version: string
  date: string
  body: string
  rawJson: any
}

let lastUpdateCheck: Date | null = null

export const useUpdater = () => {
  const { toast } = useToast()
  const status = ref<
    | 'ERROR'
    | 'NO-CHECKED'
    | 'UPDATE-AVAILABLE'
    | 'NO-UPDATE'
    | 'DOWNLOADING'
    | 'DOWNLOADED'
    | 'INSTALLING'
  >('NO-CHECKED')
  const errorMessage = ref<string | null>(null)

  let updater: Update | null = null

  const check = async () => {
    lastUpdateCheck = new Date()
    status.value = 'NO-CHECKED'
    const debugMode = await invoke<string | null>('get_env_var', {
      key: 'TAURI_DEBUG'
    })
    if (debugMode === 'true') {
      status.value = 'NO-UPDATE'
      return
    }
    const disableAutoUpdates = await invoke<string | null>('get_env_var', {
      key: 'JUMPER_DISABLE_AUTO_UPDATES'
    })
    if (disableAutoUpdates) {
      status.value = 'NO-UPDATE'
      return
    }
    const useBackendRestrictions = await invoke<string | null>('get_env_var', {
      key: 'JUMPER_USE_BACKEND_UPDATES_RESTRICTIONS'
    })
    if (useBackendRestrictions == 'false') {
      // Use default Tauri updater, that check updates directly on the Github repository.
      try {
        updater = await checkUpdates()
        if (!updater) {
          console.info('No updates available')
          status.value = 'NO-UPDATE'
          return
        }
        status.value = 'UPDATE-AVAILABLE'
        return updater
      } catch (error) {
        console.error('Error checking for updates:', error)
        errorMessage.value = 'Error checking for updates'
        status.value = 'ERROR'
        throw error
      }
    }

    try {
      await jumper.client.setBackendUrl()
      if (!jumper.client.jumperClient.defaults.baseURL) {
        console.info('No updates available')
        status.value = 'NO-UPDATE'
        return
      }
      let lastUpdateInfo = await invoke<UpdateInfo | null>('check_updates', {
        baseUrl: jumper.client.jumperClient.defaults.baseURL
      })
      if (!lastUpdateInfo) {
        console.info('No updates available')
        status.value = 'NO-UPDATE'
        return
      }
      const version = await getVersion()
      updater = new Update({
        ...lastUpdateInfo,
        date: undefined,
        currentVersion: version
      })
      status.value = 'UPDATE-AVAILABLE'
      return updater
    } catch (error) {
      console.error('Error checking for updates:', error)
      errorMessage.value = 'Error checking for updates'
      status.value = 'ERROR'
      throw error
    }
  }

  const download = async () => {
    if (!updater) {
      console.error('No updater available: check updates first')
      return
    }
    status.value = 'DOWNLOADING'
    // TODO: see to add progress indication
    await updater.download()
    status.value = 'DOWNLOADED'
  }

  const install = async () => {
    if (!updater) {
      console.error('No updater available: check updates first')
      return
    }
    status.value = 'INSTALLING'
    await updater.install()
    await relaunch()
  }

  const getNewVersion = () => {
    if (!updater) {
      console.error('No updater available: check updates first')
      return
    }
    return updater.version
  }

  const askForUpdate = async () => {
    await check()
    if (status.value !== 'UPDATE-AVAILABLE' || !updater) return
    toast({
      title: 'Update Available',
      description: `A new version ${updater.version} is available. Do you want to update?`,
      duration: 100000000000000000,
      action: h(
        ToastAction,
        {
          altText: 'Upgrade',
          async onClick() {
            const currentWindow = await getCurrentWindow()
            new WebviewWindow('updater', {
              url: '/updater', // ou une route interne genre "/subpage"
              title: 'updater',
              width: 380,
              height: 380,
              minHeight: 380,
              minWidth: 380,
              maxHeight: 380,
              maxWidth: 380,
              center: true,
              decorations: false
            })
            currentWindow.hide()
          }
        },
        { default: () => 'Upgrade' }
      )
    })
  }

  const checkUpdatePeriodicallyOnFocus = async () => {
    const windows = await getAllWindows()
    const mainWindow = windows.find((window) => window.label === 'main') ?? null
    if (mainWindow) {
      mainWindow.onFocusChanged(({ payload: focused }) => {
        if (!focused || !lastUpdateCheck) return
        if (isOlderThan10Minutes(lastUpdateCheck)) {
          askForUpdate()
        }
      })
    }
    lastUpdateCheck = new Date()
  }

  return {
    status,
    errorMessage,
    check,
    download,
    install,
    getNewVersion,
    askForUpdate,
    checkUpdatePeriodicallyOnFocus
  }
}

function isOlderThan10Minutes(date: Date) {
  const now = Date.now()
  const past = new Date(date).getTime()
  const diffMinutes = (now - past) / 1000 / 60
  return diffMinutes > 1
}
