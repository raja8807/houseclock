export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const getDaysRemaining = (targetDateString) => {
    if (!targetDateString) return 0;
    const target = new Date(targetDateString);
    const now = new Date();
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const getStatusColorFromExpiry = (daysLeft) => {
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 30) return 'urgent';
    if (daysLeft <= 90) return 'upcoming';
    return 'safe';
};
