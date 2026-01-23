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

// Returns the status string based on days remaining
export const getStatusFromDays = (daysLeft) => {
    if (daysLeft < 0) return 'urgent'; // Expired
    if (daysLeft <= 30) return 'attention'; // < 1 month
    if (daysLeft <= 90) return 'upcoming'; // < 3 months
    return 'safe'; // > 3 months
};

// Returns a semantic color key based on status
// Actual colors are imported from theme in components
export const getStatusColorName = (status) => {
    switch (status) {
        case 'urgent': return 'danger';
        case 'attention': return 'accent';
        case 'upcoming': return 'primary';
        case 'safe': return 'success';
        default: return 'textSecondary';
    }
};

// Kept for backward compatibility if needed, but components should use getStatusFromDays
export const getStatusColorFromExpiry = (daysLeft) => {
    const status = getStatusFromDays(daysLeft);
    // Return the legacy color key names directly if used by old code
    // But ideally refactor components to use status -> color mapping
    if (status === 'urgent') return 'urgent';
    if (status === 'attention') return 'attention';
    if (status === 'upcoming') return 'upcoming';
    return 'safe';
};
