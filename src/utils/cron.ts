/* eslint-disable no-console */
import cron from 'node-cron';
import Todo from '../models/todo.model';

// Schedule the cron job to run at midnight every day (0 0 * * *)
cron.schedule('0 0 * * *', (): void => {
  // Immediately invoked async function to handle the update operation
  void (async (): Promise<void> => {
    try {
      // Find all todos with a due date in the past and that are not marked as completed
      const updateData = await Todo.updateMany(
        { dueDate: { $lt: new Date() }, isCompleted: false },
        { isCompleted: true }
      );

      // Log the number of updated todos for debugging purposes
      console.log(`Expired todos marked as completed. Updated count: ${updateData.modifiedCount}`);
    } catch (error) {
      // Log any errors that occur during the cron job execution
      console.error('Error in CRON job:', error);
    }
  })();
});
