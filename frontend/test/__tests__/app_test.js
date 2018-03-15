import fetchMock from 'fetch-mock'
import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import * as Helper from '../helper';

import App from '../../components/app';
import UserDetail from '../../components/userDetail';
import UserList from '../../components/userList';
import * as SynAPI from '../../util/usersAPI'

fetchMock.get(`*`, JSON.stringify(Helper._userList))

describe('App Component', () => {
    const fetchAllUsers = jest.spyOn(SynAPI, 'fetchAllUsers');
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

describe("UserList",()=>{
    it("should match its filled snapshot",()=>{

        const tree = renderer.create(
            <UserList
                users={Helper._userList}
                selectUser={function(){}}
                selectedUser={Helper._userList[0]}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

})

describe("UserDetail", () => {
    it("should match its filled snapshot", () => {
        const tree = renderer.create(
            <UserDetail
                user={Helper._userList[0]}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
})