export const updateProfilePicture = async (file, token) => {
    const formData = new FormData();
    formData.append('profile', file);

    try {
        const response = await fetch("http://localhost:8000/profile/edit", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload profile picture");
        }

        const data = await response.json();
        console.log("Updated Profile Picture: ", data);
        return data.profile.profilePicture;
    } catch (error) {
        console.error("Error updating profile picture:", error);
        throw error;
    }
};

export const updateProfileFields = async (fields, token) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
        if (value) formData.append(key, value);
    }

    try {
        const response = await fetch("http://localhost:8000/profile/edit", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await response.json();

        if (response.status === 401) {
            return { status: response.status, message: data.message }
        }
        if (!response.ok) {
            throw new Error("Failed to update profile fields");
        }

        return data;
    } catch (error) {
        console.error("Error updating profile fields:", error);
        throw error;
    }
};

export const fetchProfile = async (token) => {

    try {
        const response = await fetch('http://localhost:8000/profile/information', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Fetching User's Profile Failed");
        }

        const data = await response.json();
        return data.profile;
        //      "profile": {
        //     "name": "Aya Nashaat",
        //     "email": "yoya@gmail.com",
        //     "status": "Hello evereybody"
        // }
    }
    catch (error) {
        console.error("Profile Request Failed");
    }

}

export const fetchUserPosts = async (token, pageNum) => {
    try {
        const response = await fetch(`http://localhost:8000/profile/posts?page=${pageNum}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Fetching User's Profile Failed");
        }

        const data = await response.json();
        return data.posts; // {items: [{title: , createdAt:}], totalItems: , currentPage:  , totalPages:  }
    }
    catch (error) {

    }
}

export const fetchUserLikedPosts = async (token, pageNum) => {
    try {
        const response = await fetch(`http://localhost:8000/profile/liked-posts?page=${pageNum}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Fetching User's Profile Failed");
        }

        const data = await response.json();
        return data.likedPosts; // {items: [{title: , creator: , createdAt: }], totalItems: , currentPage:  , totalPages: }
    }
    catch (error) {

    }
}

/**
 http://localhost:8000/profile/liked-posts?page=2
{
    "likedPosts": {
        "items": [
            {
                "title": "new post",
                "creator": "Aya Nashaat",
                "createdAt": "2024-11-20T12:32:56.272Z"
            }
        ],
        "totalItems": 1,
        "currentPage": 1,
        "totalPages": 1
    }
}
 * **/

/**
 http://localhost:8000/profile/posts?page=2
 {
    "posts": {
        "items": [
            {
                "_id": "673dd726c84d3f1eefbfd98d",
                "title": "Hi",
                "createdAt": "2024-11-20T12:33:42.396Z"
            }
        ],
        "totalItems": 1,
        "currentPage": 1,
        "totalPages": 1
    }
}
 **/



/**
http://localhost:8000/profile/edit

{
    "messgae": "User's profile updated",
    "profile": {
        "name": "Aya Nashaat",
        "email": "yoya@gmail.com",
        "status": "Hello evereybody"
    }
}

**/

/** 
http://localhost:8000/profile/information
{
    "message": "User Information Fetched",
    "profile": {
        "name": "Aya Nashaat",
        "email": "yoya@gmail.com",
        "status": "Hello evereybody"
    }
}
**/