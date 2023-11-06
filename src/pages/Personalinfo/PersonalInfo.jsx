import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userService } from '../../services/userService';

export default function PersonalInfo() {
    const params = useParams();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        fetchPersonalInfo();
	}, []);

    const fetchPersonalInfo = async (id) => {
        await userService
			.userInfoApi(params.userId)
			.then((result) => {
                setUserInfo(result.data.content)
            }
            ).catch((err) => {
                console.log(err)
            });
    }
    const renderUserInfo = () => {
            return (
				<p>
					{userInfo.id} <br />
                    {userInfo.name} <br />
                    {userInfo.email} <br />
                    {userInfo.birthday} <br />
                    {userInfo.role} <br />
                    {userInfo.avatar} <br />
                    {userInfo.phone} <br />
				</p>
			);
        }


  return (
    <div>
        {renderUserInfo()}
    </div>
  )
}
