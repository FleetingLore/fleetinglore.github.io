import React, { useRef } from 'react';
import { LoreNavigator } from '../models/LoreNavigator';
import { LoreViewer } from './LoreViewer';
import './LoreContent.css';

export const LoreApp: React.FC = () => {
    const navigatorRef = useRef(new LoreNavigator());

    return (
        <div className="lore-app">
            <LoreViewer
                navigator={navigatorRef.current}
                initialPath="/local.lore"
            />
        </div>
    );
};

export default LoreApp;