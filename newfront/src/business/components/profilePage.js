import React from 'react';
class ProfilePage extends React.Component
{
    componentWillMount()
    {
        this.props.history.push("/profile");
    }
    render(){
        return(
          <div>
            hello
          </div>
        )
    }
}
export default ProfilePage;