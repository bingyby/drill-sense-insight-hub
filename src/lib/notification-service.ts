
// Interface for email notification data
export interface EmailNotification {
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
}

// Interface for notification settings
export interface NotificationSettings {
  email: string;
  soundAlerts: boolean;
  temperatureAlerts: boolean;
  vibrationAlerts: boolean;
  hydraulicAlerts: boolean;
  criticalOnly: boolean;
}

// Queued notifications to be sent
const notificationQueue: EmailNotification[] = [];

/**
 * Send an email notification about a system malfunction
 * 
 * In a real application, this would call an API endpoint
 * This is a mock implementation that simulates sending emails
 */
export const sendMalfunctionEmail = async (
  email: string,
  component: string,
  details: string,
  severity: 'critical' | 'warning' | 'info'
): Promise<boolean> => {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    console.error('无效的电子邮箱地址');
    return false;
  }

  // Build the email subject based on severity
  const severityText = severity === 'critical' ? '危急' : 
                       severity === 'warning' ? '警告' : '信息';
  
  const subject = `【${severityText}】钻井设备故障警报: ${component}`;
  
  // Build the email message
  const message = `
    检测到钻井设备可能发生故障:
    
    设备组件: ${component}
    故障详情: ${details}
    严重程度: ${severityText}
    检测时间: ${new Date().toLocaleString()}
    
    请及时检查设备，防止故障扩大。
    
    ---
    钻井智能监控系统
    此邮件为自动发送，请勿回复。
  `;
  
  // In a real application, this would call an API endpoint to send the email
  // For this example, we'll just log the notification and add it to a queue
  console.log(`准备发送故障通知到: ${email}`);
  console.log(`主题: ${subject}`);
  console.log(`内容: ${message}`);
  
  // Add to notification queue (simulating a real system)
  notificationQueue.push({
    email,
    subject,
    message,
    timestamp: new Date()
  });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return success (would be based on API response in a real app)
  return true;
};

/**
 * Send a test notification email
 */
export const sendTestNotification = async (email: string): Promise<boolean> => {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    console.error('无效的电子邮箱地址');
    return false;
  }
  
  const subject = '【测试】钻井智能监控系统通知测试';
  
  const message = `
    这是一封测试邮件，用于确认您是否能正常接收钻井智能监控系统的通知。
    
    如果您收到此邮件，说明通知系统设置正确。当系统检测到异常情况时，您将收到类似的通知。
    
    ---
    钻井智能监控系统
    此邮件为自动发送，请勿回复。
  `;
  
  console.log(`发送测试通知到: ${email}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
};

/**
 * Save user's notification settings
 */
export const saveNotificationSettings = async (settings: NotificationSettings): Promise<boolean> => {
  console.log('保存通知设置:', settings);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return success (would be based on API response in a real app)
  return true;
};

/**
 * Check if a malfunction should trigger a notification based on user settings
 */
export const shouldNotify = (
  malfunctionType: 'sound' | 'temperature' | 'vibration' | 'hydraulic',
  severity: 'critical' | 'warning' | 'info',
  settings: NotificationSettings
): boolean => {
  // If user only wants critical alerts and this isn't critical, don't notify
  if (settings.criticalOnly && severity !== 'critical') {
    return false;
  }
  
  // Check if the specific alert type is enabled
  switch (malfunctionType) {
    case 'sound':
      return settings.soundAlerts;
    case 'temperature':
      return settings.temperatureAlerts;
    case 'vibration':
      return settings.vibrationAlerts;
    case 'hydraulic':
      return settings.hydraulicAlerts;
    default:
      return true;
  }
};
