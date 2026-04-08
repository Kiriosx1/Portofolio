// Local auth/log shim for running without the Base44 platform.
export const base44 = {
  auth: {
    me: async () => ({
      id: 'local-user',
      name: 'Local User',
      role: 'user',
    }),
    logout: async () => {
      // no-op in local mode
    },
    redirectToLogin: async () => {
      // no-op in local mode
    },
  },
  appLogs: {
    logUserInApp: async () => {
      // no-op local analytics
    },
  },
};