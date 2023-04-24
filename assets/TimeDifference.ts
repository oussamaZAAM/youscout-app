export function getTimeDifference(timestamp: string): string {
    const now: Date = new Date();
    const then: Date = new Date(timestamp);
    const diffInMs: number = now.getTime() - then.getTime() - 3600000; // We substract 1 hour from now (synchronization)
    const diffInSeconds: number = Math.floor(diffInMs / 1000);
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    const diffInHours: number = Math.floor(diffInMinutes / 60);
    const diffInDays: number = Math.floor(diffInHours / 24);
    const diffInMonths: number = Math.floor(diffInDays / 30);
  
    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    }
  }