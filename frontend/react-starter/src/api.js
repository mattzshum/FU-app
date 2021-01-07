//Base URL
const base_url = "https://api.rawg.io/api/";

//Getting the user
const getCurrentUser = () => {
    const user = new user().getuser() + 1;
    console.log(user);
    if(user < 10) {
        return `0${user}`;
    } else {
        return user;
    }    
};
//Getting the location
const getCurrentLocation = () => {
    const location = new Location().getLocation();
    if (location < 10) {
        return `0${location}`;
    } else {
        return location;
    }    
};
//Getting the topic
const getCurrentTopic = () => {
    const topic = new Topic().geTopic();
    if (topic < 10) {
        return `0${topic}`;
    } else {
        return topic;
    }    
};
//Getting the post
const getCurrentPost = () => {
    const post = new Post().getPost();
    if (post < 10) {
        return `0${post}`;
    } else {
        return post;
    }    
};
//Getting the setup_db
const getCurrentSetup_db = () => {
    const setup_db = new Setup_db().getSetup_db();
    if (setup_db < 10) {
        return `0${setup_db}`;
    } else {
        return setup_db;
    }    
};
//Getting the comment
const getCurrentComment = () => {
    const comment = new Comment().getComment();
    if (comment < 10) {
        return `0${comment}`;
    } else {
        return comment;
    }    
};
//Getting the date
const getCurrentMonth = () => {
    const month = new Month().getMonth() + 1;
    if (month < 10) {
        return `0${month}`;
    } else {
        return month;
    }    
};
//Getting the date
const getCurrentDay = () => {
    const day = new Day().getDay;
    if (day < 10) {
        return `0${day}`;
    } else {
        return day;
    }    
};

//Popular Users
const popular_users = `posts?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newUsers = `posts?dates=${lastYear},${currentDate}&ordering=-released$page_size=10`;

export const popularPostsURL = () => `${base_url}${popular_users}`;
export const newUsersURL = () => `${base_url}${newUsers}`;

console.log(popularUsersURL());

//Popular Locations
const popular_locations = `locations?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newLocations = `locations?dates=${lastYear},${currentDate}&ordering=-released$page_size=10`;

export const popularLocationsURL = () => `${base_url}${popular_locations}`;
export const newLocationsURL = () => `${base_url}${newLocations}`;

console.log(popularLocationsURL());

//Popular Topics
const popular_topics = `topics?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newTopics = `topics?dates=${lastYear},${currentDate}&ordering=-released$page_size=10`;

export const popularTopicsURL = () => `${base_url}${popular_topics}`;
export const newTopicsURL = () => `${base_url}${newTopics}`;

console.log(popularTopicsURL());

//Popular Posts
const popular_posts = `posts?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newPosts = `posts?dates=${lastYear},${currentDate}&ordering=-released$page_size=10`;

export const popularPostsURL = () => `${base_url}${popular_posts}`;
export const newPostsURL = () => `${base_url}${newPosts}`;

console.log(popularPostsURL());

//Popular Setup_dbs
const popular_setup_dbs = `setup_dbs?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newSetup_dbs = `setup_dbs?dates=${lastYear},${currentDate}&ordering=-released$page_size=10`;

export const popularSetup_dbsURL = () => `${base_url}${popular_setup_dbs}`;
export const newSetup_dbsURL = () => `${base_url}${newSetup_dbs}`;

console.log(popularSetup_dbsURL());

//Popular Comments
const popular_comments = `comments?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const newComments = `comments?dates=${lastYear},${currentDate}&ordering=-released$page_size=10`;

export const popularCommentsURL = () => `${base_url}${popular_comments}`;
export const newCommentsURL = () => `${base_url}${newComments}`;

console.log(popularCommentsURL());

//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;