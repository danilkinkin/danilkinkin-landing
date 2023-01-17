import EventBus from './eventBus';

const _eventBus = new EventBus();

const MainState = () => ({ eventBus: _eventBus });

export default MainState;
