/* React */
import * as React from 'react';

/* Enzyme */
import { shallow, render, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

/* Sinon */
import Sinon from 'sinon';

/* React 16 Enzyme Adapter */
configure({ adapter: new Adapter() });

/* Globals */
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = Sinon;
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);