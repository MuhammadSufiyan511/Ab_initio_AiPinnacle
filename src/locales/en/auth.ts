const enAuth = {
  errors: {
    invalidEmail: 'Invalid email address format.',
    invalidCredentials: 'Invalid credentials. Please try again.',
    registrationFailed: 'Registration failed. Please check details.',
    server: 'Could not connect to the server.'
  },
  login: {
    title: 'Welcome back', subtitle: 'Sign in to continue your learning journey',
    email: 'Email address', password: 'Password', remember: 'Remember me', forgot: 'Forgot password?',
    submit: 'Sign In', noAccount: "Don't have an account?", createFree: 'Create one free'
  },
  signup: {
    title: 'Create your account', subtitle: 'Start your learning journey today - free forever',
    fullName: 'Full name', email: 'Email address', password: 'Create password',
    continue: 'Continue', createAccount: 'Create Account', already: 'Already have an account?', signIn: 'Sign in'
  },
  forgot: {
    title: 'Reset password', subtitle: "Enter your email and we'll send a secure OTP.",
    submit: 'Send OTP', inbox: 'Check your inbox', back: 'Back to sign in',
    otpTitle: 'Enter OTP & New Password',
    otpSent: "We sent a 6-digit code to",
    otpLabel: '6-Digit OTP',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    resetButton: 'Reset Password',
    differentEmail: 'Use a different email',
    successTitle: 'Password Reset Complete',
    successMessage: 'Your password has been updated successfully. You can now sign in with your new password.'
  },
  panel: {
    heading1: 'Learn without', heading2: 'limits.',
    step1: 'Create Account', step1d: 'Sign up for free in 30 seconds',
    step2: 'Set Target Goal', step2d: 'Select your commission and cadre',
    step3: 'Start Practicing', step3d: 'Take official timed exams',
    description: 'Join thousands of learners on a next-generation platform built for the modern world.'
  }
}

export default enAuth
