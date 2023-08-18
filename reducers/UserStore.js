export const initState = {
  id: null,
  email: null,
  username: null,
  lastName: null,
  firstName: null,
  profileImage: null,
  groups: [],
  userPermissions: [],
  isAuth: false
}

const UserStore = (state = initState, action) => {
  if (action.type === 'UPDATE_USER') {
    return {
      ...state,
      ...action.payload
    }
  }

  if (action.type === 'RESET_USER') {
    return {
      ...state,
      ...initState
    }
  }

  return state
}

export default UserStore
