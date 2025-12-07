export const shamsiDateService = {
  getCurrentShamsiDate(): string {
    const now = new Date();
    
    // Simple Shamsi date calculation
    const dayOfWeek = this.getDayOfWeek(now.getDay());
    const day = now.getDate();
    const month = this.getMonthName(now.getMonth() + 1);
    
    return `${dayOfWeek} - ${day} ${month}`;
  },

  getDayOfWeek(day: number): string {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return days[day];
  },

  getMonthName(month: number): string {
    const months = [
      'ژانویه', 'فوریه', 'مارس', 'آوریل', 'می', 'ژوئن',
      'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
    ];
    return months[month - 1];
  },

  formatShamsiDate(date: Date): string {
    const day = date.getDate();
    const month = this.getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  },
};