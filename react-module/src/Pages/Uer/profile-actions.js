export const updateProfilePicture = async (file, token) => {
    const formData = new FormData();
    formData.append('profile', file);

    try {
        const response = await fetch("http://localhost:8000/auth/profile", {
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
        console.log("Updated Profile Picture: ", data.result);
        return data.result.profilePicture;
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
        const response = await fetch("http://localhost:8000/auth/profile", {
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
        const response = await fetch('http://localhost:8000/auth/profile', {
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