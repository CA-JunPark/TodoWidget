import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const NOTIFICATION_CHANNEL_ID = 'default';
const NOTIFICATION_SOUND = 'default';

interface NotificationContent {
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

interface NotificationError extends Error {
  code?: string;
  details?: unknown;
}

/**
 * Sets up the notification channel for Android
 * @throws {Error} If there's an error setting up the channel
 */
const setupNotificationChannel = async (): Promise<void> => {
  if (Platform.OS !== 'android') return;

  try {
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: NOTIFICATION_SOUND,
    });
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error('Failed to set up notification channel:', notificationError.message);
    throw new Error(`Notification channel setup failed: ${notificationError.message}`);
  }
};

/**
 * Configures the notification handler with default behaviors
 */
const configureNotificationHandler = (): void => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

/**
 * Schedules a local notification
 * @param id - Unique identifier for the notification
 * @param content - Notification content
 * @param triggerTime - Time in seconds until the notification should trigger
 * @throws {Error} If scheduling fails
 */
export const scheduleNotification = async (
  id: string,
  content: NotificationContent,
  triggerTime: number
): Promise<void> => {
  if (triggerTime <= 0) {
    throw new Error('Trigger time must be in the future');
  }

  try {
    await Notifications.scheduleNotificationAsync({
      identifier: id,
      content: {
        title: content.title,
        body: content.body,
        data: content.data || {},
        sound: NOTIFICATION_SOUND,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: triggerTime,
      },
    });
    console.debug(`Scheduled notification: ${id}`);
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error(`Failed to schedule notification ${id}:`, notificationError.message);
    throw new Error(`Failed to schedule notification: ${notificationError.message}`);
  }
};

/**
 * Schedules a local notification for a todo item
 * @param todoId - Unique identifier for the todo
 * @param title - Todo title
 * @param body - Todo description
 * @param date - Date when the notification should trigger
 * @returns {Promise<boolean>} True if scheduled successfully, false otherwise
 */
export const scheduleTodoNotification = async (
  todoId: number | undefined,
  title: string,
  body: string,
  date: Date | undefined
): Promise<boolean> => {
  if (!todoId || !date) return false;

  try {
    const notificationId = `todo-${todoId}`;
    await cancelScheduledNotification(notificationId);

    const now = Date.now();
    const triggerDate = new Date(date);
    // TODO set time manually after add ui in editItem.tsx
    triggerDate.setHours(12, 0, 0, 0); // Set to noon
    
    const triggerInSeconds = Math.ceil((triggerDate.getTime() - now) / 1000);
    
    if (triggerInSeconds <= 0) {
      console.warn(`Cannot schedule notification for past date: ${triggerDate.toISOString()}`);
      return false;
    }

    await scheduleNotification(
      notificationId,
      {
        title: `Reminder: ${title}`,
        body,
        data: { todoId },
      },
      triggerInSeconds
    );

    console.debug(`Scheduled notification for todo ${todoId} at ${triggerDate.toISOString()}`);
    return true;
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error('Failed to schedule todo notification:', notificationError.message);
    return false;
  }
};

/**
 * Cancels a scheduled notification
 * @param id - Notification identifier
 */
export const cancelScheduledNotification = async (id: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    console.debug(`Cancelled notification: ${id}`);
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error(`Failed to cancel notification ${id}:`, notificationError.message);
    throw new Error(`Failed to cancel notification: ${notificationError.message}`);
  }
};

/**
 * Cancels a scheduled todo notification
 * @param todoId - Todo item identifier
 */
export const cancelTodoNotification = async (todoId: number | undefined): Promise<void> => {
  if (!todoId) return;
  
  try {
    await cancelScheduledNotification(`todo-${todoId}`);
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error(`Failed to cancel todo notification ${todoId}:`, notificationError.message);
    // Don't throw, as this is often called in cleanup
  }
};

/**
 * Gets all scheduled notifications
 * @returns {Promise<Notifications.NotificationRequest[]>} Array of scheduled notifications
 */
export const getAllScheduledNotifications = async (): Promise<Notifications.NotificationRequest[]> => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error('Failed to get scheduled notifications:', notificationError.message);
    throw new Error(`Failed to get scheduled notifications: ${notificationError.message}`);
  }
};

/**
 * Initializes the notification system for local notifications
 * @returns {Promise<boolean>} True if initialization was successful
 */
export const initializeNotifications = async (): Promise<boolean> => {
  try {
    await setupNotificationChannel();
    configureNotificationHandler();
    return true;
  } catch (error) {
    const notificationError = error as NotificationError;
    console.error('Failed to initialize notifications:', notificationError.message);
    return false;
  }
};
