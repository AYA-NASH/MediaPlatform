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
        return data.posts;
    }
    catch (error) {
        console.error("Fetching User's data failed")
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
        return data.likedPosts;
    }
    catch (error) {
        console.error("Fetchin user's activities failed");
    }
}

export const deleteAccount = async (token) => {
    try {
        const response = await fetch("http://localhost:8000/profile/delete-account", {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete the Account");
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to delete the Account", err);
        throw err;
    }
};
