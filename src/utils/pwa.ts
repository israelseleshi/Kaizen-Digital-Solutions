import { Workbox } from 'workbox-window';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

class PWAManager {
  private wb: Workbox | null = null;
  private installPrompt: PWAInstallPrompt | null = null;
  private isInstalled = false;
  private updateAvailable = false;

  constructor() {
    this.init();
  }

  private async init() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      this.wb = new Workbox('/sw.js');
      
      // Listen for service worker events
      this.wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          this.handleUpdate();
        } else {
          console.log('Service worker installed for the first time');
        }
      });

      this.wb.addEventListener('waiting', () => {
        this.updateAvailable = true;
        this.showUpdatePrompt();
      });

      this.wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      // Register the service worker
      await this.wb.register();
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e as any;
      this.showInstallPrompt();
    });

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallPrompt();
    });

    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }
  }

  public async installApp(): Promise<boolean> {
    if (!this.installPrompt) {
      return false;
    }

    try {
      await this.installPrompt.prompt();
      const choiceResult = await this.installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Error during app installation:', error);
      return false;
    }
  }

  public async updateApp(): Promise<void> {
    if (this.wb && this.updateAvailable) {
      this.wb.messageSkipWaiting();
    }
  }

  private showInstallPrompt() {
    // Create install prompt UI
    const installBanner = document.createElement('div');
    installBanner.id = 'pwa-install-banner';
    installBanner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 transform translate-y-full transition-transform duration-300';
    
    installBanner.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 dark:text-white text-sm">Install Kaizen Digital</h4>
          <p class="text-xs text-gray-600 dark:text-gray-400">Get the app for a better experience</p>
        </div>
        <button id="pwa-install-btn" class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          Install
        </button>
        <button id="pwa-dismiss-btn" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(installBanner);

    // Show banner with animation
    setTimeout(() => {
      installBanner.style.transform = 'translateY(0)';
    }, 100);

    // Add event listeners
    const installBtn = document.getElementById('pwa-install-btn');
    const dismissBtn = document.getElementById('pwa-dismiss-btn');

    installBtn?.addEventListener('click', async () => {
      const installed = await this.installApp();
      if (installed) {
        this.hideInstallPrompt();
      }
    });

    dismissBtn?.addEventListener('click', () => {
      this.hideInstallPrompt();
    });
  }

  private hideInstallPrompt() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  private showUpdatePrompt() {
    // Create update prompt UI
    const updateBanner = document.createElement('div');
    updateBanner.id = 'pwa-update-banner';
    updateBanner.className = 'fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-blue-600 text-white rounded-lg shadow-lg p-4 z-50 transform -translate-y-full transition-transform duration-300';
    
    updateBanner.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="font-semibold text-sm">Update Available</h4>
          <p class="text-xs text-blue-100">New features and improvements ready</p>
        </div>
        <button id="pwa-update-btn" class="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
          Update
        </button>
        <button id="pwa-update-dismiss-btn" class="text-blue-200 hover:text-white">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(updateBanner);

    // Show banner with animation
    setTimeout(() => {
      updateBanner.style.transform = 'translateY(0)';
    }, 100);

    // Add event listeners
    const updateBtn = document.getElementById('pwa-update-btn');
    const dismissBtn = document.getElementById('pwa-update-dismiss-btn');

    updateBtn?.addEventListener('click', () => {
      this.updateApp();
      this.hideUpdatePrompt();
    });

    dismissBtn?.addEventListener('click', () => {
      this.hideUpdatePrompt();
    });
  }

  private hideUpdatePrompt() {
    const banner = document.getElementById('pwa-update-banner');
    if (banner) {
      banner.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  private handleUpdate() {
    console.log('Service worker updated');
    this.updateAvailable = true;
  }

  // Public methods for external use
  public getInstallStatus(): boolean {
    return this.isInstalled;
  }

  public hasUpdateAvailable(): boolean {
    return this.updateAvailable;
  }

  public async enableNotifications(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  public async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (await this.enableNotifications()) {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        ...options
      });
    }
  }
}

// Export singleton instance
export const pwaManager = new PWAManager();

// Utility functions for PWA features
export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

export const isPWASupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

export const getInstallPrompt = (): PWAInstallPrompt | null => {
  return (window as any).deferredPrompt || null;
};

export const trackPWAUsage = (event: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.trackEvent('pwa_usage', {
      event,
      data,
      isInstalled: isPWAInstalled(),
      timestamp: new Date().toISOString()
    });
  }
};
