import React from 'react';
import CustomToggle from '../../shared/CustomToggle';

const ReminderItem = ({ item, onToggle }) => {
    return (
        <CustomToggle
            label={item.title}
            value={item.enabled}
            onValueChange={onToggle}
        />
    );
};

export default ReminderItem;
