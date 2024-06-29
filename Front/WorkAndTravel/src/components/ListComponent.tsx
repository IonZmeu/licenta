import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Collapse, Box, ListItemIcon, ListItemButton } from '@mui/material';
import { styled } from '@mui/system';

const ScrollableList = styled(Box)({
    maxHeight: '200px',
    overflowY: 'auto',
});

interface ListComponentProps {
    items: {
        id: string;
        primary: string;
        icon: React.ReactNode;
        onClick: () => void;
    }[];
}

const ListComponent: React.FC<ListComponentProps> = ({ items }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <List>
                {items.slice(0, expanded ? items.length : 5).map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.primary} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {!expanded && items.length > 5 && (
                <Button onClick={handleToggle}>Expand</Button>
            )}
            <Collapse in={expanded}>
                <ScrollableList>
                    {items.slice(5).map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton onClick={item.onClick}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.primary} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </ScrollableList>
            </Collapse>
        </div>
    );
};

export default ListComponent;
