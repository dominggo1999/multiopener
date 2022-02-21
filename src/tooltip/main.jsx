import React, { ReactDOM } from 'react';
import Tooltip from './Tooltip';

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);
ReactDOM.render(<Tooltip />, app);
