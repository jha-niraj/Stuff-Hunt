export const verificationEmailTemplate = (otp: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your email - StuffHunt</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #FF6EC7 0%, #DF87F3 50%, #000000 100%); min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="display: inline-flex; align-items: center; gap: 16px; background: white; padding: 20px 32px; border-radius: 20px; box-shadow: 0 8px 32px rgba(255, 110, 199, 0.3);">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: 24px; font-weight: 900;">🛍️</span>
                        </div>
                        <h1 style="margin: 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 800;">StuffHunt</h1>
                    </div>
                </div>

                <!-- Main Content Card -->
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15); border: 2px solid transparent; background-clip: padding-box;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(255, 110, 199, 0.4); position: relative;">
                            <div style="position: absolute; inset: 4px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 36px;">🎉</span>
                            </div>
                        </div>
                        <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 36px; font-weight: 800;">Welcome to StuffHunt!</h2>
                        <p style="margin: 0; color: #6b7280; font-size: 18px; line-height: 1.6;">Discover amazing products with AI-powered search. Verify your email to start your shopping journey!</p>
                    </div>

                    <!-- OTP Section -->
                    <div style="background: linear-gradient(135deg, rgba(255, 110, 199, 0.1), rgba(223, 135, 243, 0.1)); border: 3px solid #FF6EC7; border-radius: 24px; padding: 40px; text-align: center; margin: 32px 0; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -30px; right: -30px; width: 80px; height: 80px; background: rgba(255, 110, 199, 0.2); border-radius: 50%;"></div>
                        <div style="position: absolute; bottom: -40px; left: -40px; width: 100px; height: 100px; background: rgba(223, 135, 243, 0.2); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <h3 style="margin: 0 0 20px 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 20px; font-weight: 700;">Your Verification Code</h3>
                            <div style="background: white; border-radius: 16px; padding: 32px; margin: 20px 0; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); border: 2px solid rgba(255, 110, 199, 0.2);">
                                <div style="font-size: 56px; font-weight: 900; letter-spacing: 16px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; font-family: 'Courier New', monospace;">${otp}</div>
                            </div>
                            <div style="margin-top: 24px;">
                                <button onclick="navigator.clipboard.writeText('${otp}')" style="background: linear-gradient(135deg, #FF6EC7, #DF87F3); color: white; border: none; border-radius: 12px; padding: 16px 32px; font-size: 16px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s; box-shadow: 0 6px 20px rgba(255, 110, 199, 0.3);">
                                    <span style="font-size: 18px;">📋</span>
                                    Copy Code
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Instructions -->
                    <div style="text-align: center; margin: 32px 0;">
                        <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 1.6;">Enter this code on the verification page to complete your registration. This code will expire in <strong style="color: #FF6EC7;">10 minutes</strong>.</p>
                        <div style="background: linear-gradient(135deg, rgba(255, 110, 199, 0.1), rgba(223, 135, 243, 0.1)); border: 2px solid #FF6EC7; border-radius: 16px; padding: 20px; margin: 20px 0;">
                            <p style="margin: 0; color: #1f2937; font-size: 14px; font-weight: 600;">⚠️ If you didn't create an account with StuffHunt, please ignore this email.</p>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; padding: 24px; background: rgba(255, 255, 255, 0.9); border-radius: 16px; backdrop-filter: blur(10px);">
                    <p style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">This email was sent by StuffHunt</p>
                    <p style="margin: 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 14px; font-weight: 600;">🛍️ Find anything, buy everything!</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export const passwordResetEmailTemplate = (resetUrl: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset your password - StuffHunt</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #FF6EC7 0%, #DF87F3 50%, #000000 100%); min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="display: inline-flex; align-items: center; gap: 16px; background: white; padding: 20px 32px; border-radius: 20px; box-shadow: 0 8px 32px rgba(255, 110, 199, 0.3);">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: 24px; font-weight: 900;">🛍️</span>
                        </div>
                        <h1 style="margin: 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 800;">StuffHunt</h1>
                    </div>
                </div>

                <!-- Main Content Card -->
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15); border: 2px solid transparent; background-clip: padding-box;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #ff4757, #ff6b7a); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(255, 71, 87, 0.4); position: relative;">
                            <div style="position: absolute; inset: 4px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 36px;">🔐</span>
                            </div>
                        </div>
                        <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 36px; font-weight: 800;">Password Reset</h2>
                        <p style="margin: 0; color: #6b7280; font-size: 18px; line-height: 1.6;">No worries! We'll help you reset your password and get back to hunting for amazing stuff.</p>
                    </div>

                    <!-- Reset Button -->
                    <div style="text-align: center; margin: 40px 0;">
                        <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF6EC7, #DF87F3); color: white; text-decoration: none; padding: 20px 40px; border-radius: 16px; font-size: 20px; font-weight: 700; box-shadow: 0 12px 32px rgba(255, 110, 199, 0.4); transition: all 0.3s; text-transform: uppercase; letter-spacing: 1px;">
                            🔑 Reset My Password
                        </a>
                    </div>

                    <!-- Alternative Link -->
                    <div style="background: linear-gradient(135deg, rgba(255, 110, 199, 0.05), rgba(223, 135, 243, 0.05)); border-radius: 16px; padding: 24px; margin: 32px 0; border: 1px solid rgba(255, 110, 199, 0.2);">
                        <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px; font-weight: 600;">Can't click the button? Copy and paste this link:</p>
                        <div style="background: white; border: 2px solid #FF6EC7; border-radius: 12px; padding: 16px; font-family: 'Courier New', monospace; font-size: 12px; color: #FF6EC7; word-break: break-all; font-weight: 600;">${resetUrl}</div>
                    </div>

                    <!-- Security Notice -->
                    <div style="background: linear-gradient(135deg, rgba(255, 110, 199, 0.1), rgba(223, 135, 243, 0.1)); border: 2px solid #FF6EC7; border-radius: 16px; padding: 24px; margin: 32px 0;">
                        <h4 style="margin: 0 0 16px 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: 700;">🔒 Security Notice</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.8; font-weight: 500;">
                            <li>This link will expire in <strong style="color: #FF6EC7;">1 hour</strong></li>
                            <li>If you didn't request this reset, please ignore this email</li>
                            <li>Your password won't change until you create a new one</li>
                            <li>Keep your account secure for the best shopping experience</li>
                        </ul>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; padding: 24px; background: rgba(255, 255, 255, 0.9); border-radius: 16px; backdrop-filter: blur(10px);">
                    <p style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">This email was sent by StuffHunt</p>
                    <p style="margin: 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 14px; font-weight: 600;">🛍️ Find anything, buy everything!</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export const registrationSuccessEmailTemplate = (name: string, email: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to StuffHunt - Let's Start Shopping!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #FF6EC7 0%, #DF87F3 50%, #000000 100%); min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="display: inline-flex; align-items: center; gap: 16px; background: white; padding: 20px 32px; border-radius: 20px; box-shadow: 0 8px 32px rgba(255, 110, 199, 0.3);">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-size: 24px; font-weight: 900;">🛍️</span>
                        </div>
                        <h1 style="margin: 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; font-weight: 800;">StuffHunt</h1>
                    </div>
                </div>

                <!-- Main Content Card -->
                <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15); border: 2px solid transparent; background-clip: padding-box;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 16px 40px rgba(255, 110, 199, 0.4); position: relative;">
                            <div style="position: absolute; inset: 4px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 48px;">🎉</span>
                            </div>
                        </div>
                        <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 40px; font-weight: 900;">Welcome, ${name}! 🎊</h2>
                        <p style="margin: 0; color: #6b7280; font-size: 20px; line-height: 1.6; max-width: 400px; margin: 0 auto;">Your StuffHunt journey starts now! Get ready to discover amazing products with AI-powered search.</p>
                    </div>

                    <!-- Features Section -->
                    <div style="margin: 40px 0;">
                        <h3 style="text-align: center; margin: 0 0 32px 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 24px; font-weight: 800;">What's waiting for you:</h3>
                        
                        <div style="display: grid; gap: 20px;">
                            <!-- Feature 1 -->
                            <div style="display: flex; align-items: start; gap: 16px; background: linear-gradient(135deg, rgba(255, 110, 199, 0.05), rgba(223, 135, 243, 0.05)); border-radius: 16px; padding: 24px; border: 1px solid rgba(255, 110, 199, 0.2);">
                                <div style="flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 20px;">🔍</span>
                                </div>
                                <div style="flex-grow: 1;">
                                    <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px; font-weight: 700;">Smart Search</h4>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Search by keywords or upload images! Our AI will find exactly what you're looking for.</p>
                                </div>
                            </div>

                            <!-- Feature 2 -->
                            <div style="display: flex; align-items: start; gap: 16px; background: linear-gradient(135deg, rgba(255, 110, 199, 0.05), rgba(223, 135, 243, 0.05)); border-radius: 16px; padding: 24px; border: 1px solid rgba(255, 110, 199, 0.2);">
                                <div style="flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 20px;">⚖️</span>
                                </div>
                                <div style="flex-grow: 1;">
                                    <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px; font-weight: 700;">Compare Products</h4>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Compare up to 4 products side-by-side to make the best purchase decisions.</p>
                                </div>
                            </div>

                            <!-- Feature 3 -->
                            <div style="display: flex; align-items: start; gap: 16px; background: linear-gradient(135deg, rgba(255, 110, 199, 0.05), rgba(223, 135, 243, 0.05)); border-radius: 16px; padding: 24px; border: 1px solid rgba(255, 110, 199, 0.2);">
                                <div style="flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #FF6EC7, #DF87F3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: white; font-size: 20px;">💬</span>
                                </div>
                                <div style="flex-grow: 1;">
                                    <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px; font-weight: 700;">Direct Seller Contact</h4>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">Connect directly with sellers for custom requests and better deals.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Get Started Button -->
                    <div style="text-align: center; margin: 40px 0;">
                        <a href="${process.env.NEXTAUTH_URL || 'https://stuffhunt.com'}" style="display: inline-block; background: linear-gradient(135deg, #FF6EC7, #DF87F3); color: white; text-decoration: none; padding: 20px 40px; border-radius: 16px; font-size: 20px; font-weight: 700; box-shadow: 0 12px 32px rgba(255, 110, 199, 0.4); transition: all 0.3s; text-transform: uppercase; letter-spacing: 1px;">
                            🚀 Start Shopping Now
                        </a>
                    </div>

                    <!-- Account Details -->
                    <div style="background: linear-gradient(135deg, rgba(255, 110, 199, 0.05), rgba(223, 135, 243, 0.05)); border-radius: 16px; padding: 24px; margin: 32px 0; border: 1px solid rgba(255, 110, 199, 0.2);">
                        <h4 style="margin: 0 0 16px 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: 700;">📧 Your Account Details</h4>
                        <div style="color: #1f2937; font-size: 14px; line-height: 1.8; font-weight: 500;">
                            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 0;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <!-- Support Info -->
                    <div style="background: linear-gradient(135deg, rgba(255, 110, 199, 0.1), rgba(223, 135, 243, 0.1)); border: 2px solid #FF6EC7; border-radius: 16px; padding: 24px; margin: 32px 0;">
                        <h4 style="margin: 0 0 12px 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: 700;">💬 Need Help?</h4>
                        <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; font-weight: 500;">
                            Our support team is here to help you make the most of your StuffHunt experience. Happy hunting! 🛍️
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; padding: 24px; background: rgba(255, 255, 255, 0.9); border-radius: 16px; backdrop-filter: blur(10px);">
                    <p style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">This email was sent by StuffHunt</p>
                    <p style="margin: 0; background: linear-gradient(135deg, #FF6EC7, #DF87F3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 14px; font-weight: 600;">🛍️ Find anything, buy everything!</p>
                </div>
            </div>
        </body>
        </html>
    `;
};