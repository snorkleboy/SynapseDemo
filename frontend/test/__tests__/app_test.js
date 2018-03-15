import App from '../../components/app';
import UserDetail from '../../components/userDetail';
import UserList from '../../components/userList';
import fetchMock from 'fetch-mock'
import * as SynAPI from '../../util/usersAPI'
import * as Helper from '../helper';
import React from 'react';
// test('App component', () => {
    // const wrapper = shallow(<app/>);
    // expect(wrapper).toMatchSnapshot();
// });
fetchMock.get(`*`, JSON.stringify(Helper._userList))
const fetchAllUsers = jest.spyOn(SynAPI, 'fetchAllUsers');

describe('App Component', () => {
    const wrapper = shallow(<App />);
    describe("renders loader and fetches data OnMount",()=>{

        it('should call util/usersAPI.fetchAllUsers after mounting', () => {
            expect(fetchAllUsers).toHaveBeenCalledTimes(1);
        });
        it('should render a loader when state.loading is true', () => {
            wrapper.setState({ loading: true })
            expect(wrapper.find('.loader').length).toBe(1)
        })
        it('should not render loader when not loading', () => {
            wrapper.setState({ loading: false })
            expect(wrapper.find('.loader').length).toBe(0)
        })
    })

    describe("renders UserDetail and UserList when it has users in state",()=>{
        wrapper.setState({ users: Helper._userList, loading: false })
        let userdetail = wrapper.find(UserDetail)
        const userlist = wrapper.find(UserList)
        it('should render UserDetail and UserList components when state has users', () => {
            expect(userdetail.length).toBe(1)
            expect(userlist.length).toBe(1)
        })

        it("should pass down the list of users to Userlist",()=>{
            expect(userlist.props()).toHaveProperty('users',Helper._userList)
        })
        it("should pass a user to UserDetail",()=>{
            expect(userdetail.props()).toHaveProperty('user')
        })


        describe("Passes a handler to UserList which results in clicked user being passed to UserDetail", () => {
            it("should pass selectUser to userlist", () => {
                expect(userlist.props()).toHaveProperty('selectUser')
            })
            it("calling selectUser with a user should result in it being passed to User Detail", () => {
                userlist.props().selectUser(Helper._userList[0])()
                wrapper.update();
                let userdetail = wrapper.find(UserDetail)
                expect(userdetail.props()).toHaveProperty('user', Helper._userList[0])
            })
        })
    })
})

// describe("UserList",()=>{
    // const mockClickHandler = jest.fn();
    // const wrapper = shallow(<UserList users={Helper._userList}/>);
// 
// })


// wrapper.find('[name="toggle-preview"]').simulate('click');
// loginComponent.setState({ error: true });
// expect(loginComponent.find(Notification).length).toBe(1);

// describe("API",()=>{
//     it('should fetch array of objects',()=>{
//         expect.assertions(1)
//         return SynAPI.fetchAllUsers.then(res=>{
//              expect(res).toHaveProperty('id')
//              expect(res[0])
//         })
//     })
// }

// test(`using promises`, () => {
    
//     return fetchResponseJson(`http://foo.bar`).then(
//         (responseJson) => { expect(responseJson).toHaveProperty(`Rick`, `I turned myself into a pickle, Morty!`) })
// })
// describe('UserList Component', () => {

//     describe("Should render an array of user objects", () => {
//         it('accepts users as props',()=>{
//             <UserList users={Helper._userList}/>
//         })
//         it('should respond to change event and change the state of the Login Component', () => {

//             const wrapper = shallow(<Login />);
//             wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'blah@gmail.com' } });

//             expect(wrapper.state('email')).toEqual('blah@gmail.com');
//         })
//     })

//     it('should accept an Array of User Objects')
// })


