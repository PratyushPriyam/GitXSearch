import React, { useEffect, useState } from 'react'
import NameCard from './DIsplayCards/NameCard/NameCard';
import AvatarAndLogin from './DIsplayCards/AvatarAndLogin/AvatarAndLogin';
import BioCard from './DIsplayCards/Bio/BioCard';
import style from './AppMain.module.css'

export default function ApiMain() {
    const [search, setSearch] = useState("pratyushpriyam")
    const [name, getName] = useState("")
    const [avatarImg, getAvatarImg] = useState("")
    const [loginId, getLoginId] = useState("")
    const [bio, getBio] = useState("")
    const [reposLink, getReposLink] = useState("")
    const [repo, getRepo] = useState([])
    const [htmlUrl, setHtmlUrl] = useState("")
    const [blog, setBlog] = useState("")
    const [location, setLocation] = useState("None")
    const [followers, setFollowers] = useState("None")
    const [following, setFollowing] = useState("None")
    const [createdAt, setCreatedAt] = useState("None")
    const [publicRepos, setPublicRepos] = useState(0)
    const [everyRepoLink, setEveryRepoLink] = useState("")
    let arr = []
    let arrRepo = []




    const getGitHubApi = async () => {
        try {
            let url = await fetch(`https://api.github.com/users/${search}`)
            let urlToJson = await url.json()

            // // console.log(urlToJson)
            // console.log(repoUrlToJson);

            // Fetching Relevant Data
            getName(urlToJson.name)
            getAvatarImg(urlToJson.avatar_url)
            getLoginId(urlToJson.login)
            getBio(urlToJson.bio)
            getReposLink(urlToJson.repos_url)
            setHtmlUrl(urlToJson.html_url)
            setBlog(urlToJson.blog)
            setLocation(urlToJson.location)
            setFollowers(urlToJson.followers)
            setFollowing(urlToJson.following)
            setCreatedAt(urlToJson.created_at)
            setPublicRepos(urlToJson.public_repos)

        }
        catch (error) {
            console.log(error);
        }
    }

    const repoGitHubApi = async () => {
        try {
            let repoUrl = await fetch(`${reposLink}`)
            let repoUrlToJson = await repoUrl.json()
            console.log(repoUrlToJson);
            // getRepo(repoUrlToJson[0].name)
            // console.log(repoUrlToJson[0].name)
            // console.log(repo);
            repoUrlToJson.map((item, index) => {
                // console.log(item);
                arr.push(item.name)
                arrRepo.push(item.html_url)

            })
            // console.log(arr);
            // console.log(arrRepo);
            getRepo(arr)
            setEveryRepoLink(arrRepo)

        }
        catch (e) {
            console.log(e);
        }
    }

    const searchOnGitHub = (e) => {
        e.preventDefault()
        getGitHubApi()
        setSearch("")
    }
    useEffect(() => {
        getGitHubApi()
    }, [])
    useEffect(() => {
        repoGitHubApi()
    }, [reposLink])
    return (
        <div className={style.main}>
            <form className={style.form}>
                <h2>Welcome, User</h2>
                <div>
                <input type='text' placeholder='Enter name to search'
                    onChange={(e) => { setSearch(e.target.value) }} />
                <button onClick={searchOnGitHub}>Search</button>
                </div>
                <button>Log Out</button>
            </form>
            <div className={style.body}>
                <NameCard name={name} />
                <AvatarAndLogin avatarImg={avatarImg} loginId={loginId} />
                <BioCard bio={bio} />
            </div>
            <div className={style.links}>
                <a href={htmlUrl}>Click here to visit this profile</a>
                <a href={blog}>Click here to visit blog</a>
            </div>
            <div className={style.extras}>
                <p>Location: {location}</p>
                <p>Followers: {followers}</p>
                <p>Following: {following}</p>
                <p>Created At: {createdAt}</p>
            </div>
            <div className={style.publicrepos}>
                Public Repos: {publicRepos}
                <i class="fa-solid fa-arrow-down"></i>
            </div>
            <div className={style.repoList}>
                {repo.map((item, index) => {
                    return (
                        <a href={everyRepoLink[index]}><h1>{item}</h1></a>
                    )
                })}
            </div>
        </div>
    )
}
