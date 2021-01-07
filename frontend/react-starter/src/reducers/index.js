import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import locationsReducer from "./locationsReducer";
import topicsReducer from "./topicsReducer";
import postsReducer from "./postsReducer";
import setup_dbsReducer from "./setup_dbsReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = usersReducers({
    users: usersReducer,

});

export default rootReducer;

const rootReducer = locationsReducers({
    locations: locationsReducer,

});

export default rootReducer;

const rootReducer = topicsReducers({
    topics: topicsReducer,

});

export default rootReducer;

const rootReducer = postsReducers({
    posts: postsReducer,

});

export default rootReducer;

const rootReducer = setup_dbsReducers({
    setup_dbs: setup_dbsReducer,

});

export default rootReducer;

const rootReducer = commentsReducers({
    comments: commentsReducer,

});

export default rootReducer;