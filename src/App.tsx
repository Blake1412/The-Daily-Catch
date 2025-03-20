import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import ThreadPage from "./pages/ThreadPage";
import {PostProps} from "./components/Post/Post";


function App() {

    const postData: PostProps[] = [
        {
            authorName: 'John',
            authorProfilePicture: 'https://picsum.photos/220/300',
            fishType: 'Mackerel',
            createdAt: new Date(new Date().setMinutes(new Date().getMinutes() - 10)),
            location: 'Limerick',
            fishWeight: 10,
            message: 'Hello world!',
            image: 'https://picsum.photos/250/300',
            likes: 10,
            userLiked: false,
            comments: [{ text: "Nice", postedAt: new Date(),author: "Mike", authorProfilePicture: 'https://picsum.photos/260/300'}, { text: "Very cool", postedAt: new Date(),author: "Dave", authorProfilePicture: 'https://picsum.photos/260/303'},],
        },
        {
            authorName: 'John',
            authorProfilePicture: 'https://picsum.photos/201/300',
            fishType: 'Mackerel',
            createdAt: new Date(),
            location: 'Limerick',
            fishWeight: 10,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            image: 'https://picsum.photos/260/300',
            likes: 10,
            userLiked: false,
            comments: [],
        },
        {
            authorName: 'John',
            authorProfilePicture: 'https://picsum.photos/500/400',
            fishType: 'Mackerel',
            createdAt: new Date(),
            location: 'Limerick',
            fishWeight: 10,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            image: 'https://picsum.photos/400/300',
            likes: 10,
            userLiked: false,
            comments: [],
        },
        {
            authorName: 'John',
            authorProfilePicture: 'https://picsum.photos/200/300',
            fishType: 'Mackerel',
            createdAt: new Date(),
            location: 'Limerick',
            fishWeight: 10,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum             message: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            image: 'https://picsum.photos/4000/4000',
            likes: 10,
            userLiked: false,
            comments: [],
        }
    ]

    return (
        <>
            <Router>
                <Routes>
                    <Route path={"/"} element={<ThreadPage posts={postData}/>}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
