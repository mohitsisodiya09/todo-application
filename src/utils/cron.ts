/* eslint-disable no-console */
import cron from 'node-cron';
import Todo from '../models/todo.model';

cron.schedule('0 0 * * *', (): void => {
  void (async (): Promise<void> => {
    try {
      const updateData = await Todo.updateMany(
        { dueDate: { $lt: new Date() }, isCompleted: false },
        { isCompleted: true }
      );
      console.log(`Expired todos marked as completed. Updated count: ${updateData.modifiedCount}`);
    } catch (error) {
      console.error('Error in CRON job:', error);
    }
  })();
});
