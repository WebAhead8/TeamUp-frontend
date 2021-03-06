import React from 'react'
import { getUser, updateUser } from '../../utils/fetchUsers'
import DataList from '../DataList'
import UsersPost from './UsersPost'
import DeleteAccount from './Popups/DeleteAccount'
import Edit from './Popups/Edit'
import EditEmail from './Popups/EditEmail'
import EditPassword from './Popups/EditPassword'
import EditUsername from './Popups/EditUsername'
import Notification from '../Notification'
import Plateform from '../Platform'
import LoadingPage from '../../pages/LoadingPage'
import EditAvatarImg from './Popups/EditAvatarImg'

function Profile() {
  // States
  React.useEffect(() => {
    const token = window.sessionStorage.getItem('access_token')
    getUser(token)
      .then((data) => {
        setUser(data)
        setIsLoggedIn(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const [user, setUser] = React.useState({})
  const [newUser, setNewUser] = React.useState({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    pass: user.pass,
    platform: user.platform,
    gamelist: user.gamelist,
    avataricon: user.avataricon,
  })
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [trigger, setTrigger] = React.useState(false)
  const [noti, setNoti] = React.useState(false)
  const [triggerEmail, setTriggerEmail] = React.useState(false)
  const [triggerPass, setTriggerPass] = React.useState(false)
  const [triggerUsername, setTriggerUsername] = React.useState(false)
  const [triggerDelete, setTriggerDelete] = React.useState(false)
  const [triggerAvatar, setTriggerAvatar] = React.useState(false)

  React.useEffect(() => {
    const token = window.sessionStorage.getItem('access_token')
    if (token) {
      getUser(token)
        .then((data) => {
          setUser(data)
          setIsLoggedIn(true)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setNoti(true)
    }
  }, [newUser])

  // Logout Function
  const logout = () => {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('username')

    setUser({})
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  function onChangeAvatar(avatarSrc) {
    setNewUser({ avataricon: avatarSrc })
    window.location.reload()
  }

  function deletePlateform(plat) {
    let index = user.platform.indexOf(plat)
    if (index !== -1) {
      user.platform.splice(index, 1)

      const url = 'platforms'
      updateUser(url, { id: user.id, platform: user.platform })
        .then((data) => setNewUser(data))
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function deleteGameList(game) {
    let index = user.gamelist.indexOf(game)
    if (index !== -1) {
      user.gamelist.splice(index, 1)

      const url = 'gameslist'
      updateUser(url, { id: user.id, gamelist: user.gamelist })
        .then((data) => setNewUser(data))
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return user ? (
    <div className="profile">
      <Notification noti={noti} setNoti={setNoti} link="/login">
        You Have To Login First
      </Notification>
      <div className="profile-hdr">
        <header>
          <div className="avatar">
            <img src={user.avataricon} />
          </div>
          <h1>Welcome, {user.username}</h1>

          <button
            onClick={() => {
              setTrigger(!trigger)
              setTriggerUsername(false)
              setTriggerEmail(false)
              setTriggerPass(false)
              setTriggerDelete(false)
              setTriggerAvatar(false)
            }}
          >
            <img src="../../Assets/EditBtn.svg" alt="" />
          </button>
        </header>
      </div>
      <Edit trigger={trigger} setTrigger={setTrigger}>
        <h1>Edit Your Info</h1>
        <a
          onClick={() => {
            setTriggerEmail(true)
            setTrigger(false)
          }}
        >
          Edit Your Email
        </a>
        <a
          onClick={() => {
            setTriggerPass(true)
            setTrigger(false)
          }}
        >
          Edit Your Password
        </a>
        <a
          onClick={() => {
            setTriggerUsername(true)
            setTrigger(false)
          }}
        >
          Edit Your Username
        </a>
        <a
          onClick={() => {
            setTriggerAvatar(true)
            setTrigger(false)
          }}
        >
          Edit Your Avatar Img
        </a>
        <a
          className="del-account"
          onClick={() => {
            setTriggerDelete(true)
            setTrigger(false)
          }}
        >
          Delete Your Account
        </a>
      </Edit>
      <EditEmail
        triggerEmail={triggerEmail}
        setTriggerEmail={setTriggerEmail}
        setTrigger={setTrigger}
        user={user}
      />
      <EditPassword
        triggerPass={triggerPass}
        setTriggerPass={setTriggerPass}
        setTrigger={setTrigger}
        user={user}
      />
      <EditUsername
        triggerUsername={triggerUsername}
        setTriggerUsername={setTriggerUsername}
        setTrigger={setTrigger}
        userId={user.id}
        user={user}
      />
      <EditAvatarImg
        triggerAvatar={triggerAvatar}
        setTriggerAvatar={setTriggerAvatar}
        setTrigger={setTrigger}
        userId={user.id}
        setNewAvatar={setNewUser.avataricon}
        onChange={onChangeAvatar}
      />
      <DeleteAccount
        triggerDelete={triggerDelete}
        setTriggerDelete={setTriggerDelete}
        setTrigger={setTrigger}
        id={user.id}
      />
      <fieldset className="user-info">
        <legend>User Info</legend>
        <i>First Name: {user.firstname}</i>
        <i>Last Name: {user.lastname}</i>
        <i>Username: {user.username}</i>
        <i>E-Mail: {user.email}</i>
      </fieldset>

      {/*flatfoooorms */}
      <fieldset className="platforms">
        <label>
          Add New Platforms: <br />
          <Plateform user={user} setUser={setUser} />
        </label>
        <legend> Platforms</legend>
        {user.platform ? (
          <ul>
            {user.platform.map((plat) => (
              <li className="gameName" key={plat}>
                <img src={`../../Assets/${plat}.svg`} />

                <i className="delBtn" onClick={() => deletePlateform(plat)}>
                  <abbr title="delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-eraser"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ff4500"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />
                      <line x1="18" y1="12.3" x2="11.7" y2="6" />
                    </svg>
                  </abbr>
                </i>
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </fieldset>

      {/* GamesList*/}
      <fieldset className="gamelist">
        <label>
          Add New Game : <br />
          <DataList user={user} setUser={setUser} />
        </label>

        <legend> Games List</legend>
        {user.gamelist ? (
          <ul>
            {user.gamelist.map((game) => (
              <li className="gameName" key={game.id}>
                {game}
                <i className="delBtn" onClick={() => deleteGameList(game)}>
                  <abbr title="delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-eraser"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ff4500"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />
                      <line x1="18" y1="12.3" x2="11.7" y2="6" />
                    </svg>
                  </abbr>
                </i>
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </fieldset>
      <fieldset className="posts">
        <legend>My Posts :</legend>

        <UsersPost user={user} />
      </fieldset>
      <button onClick={logout} className="logout">
        Logout
      </button>
    </div>
  ) : (
    <LoadingPage />
  )
}

export default Profile
