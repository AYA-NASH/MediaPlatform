export const validateTitle = (title) => {
    if (!title.trim()) return "Title is required.";
    if (title.length > 100) return "Title must not exceed 100 characters.";
    return null;
};

export const validateContent = (content) => {
    if (!content.trim()) return "Content is required.";
    if (content.length < 20) return "Content must be at least 20 characters.";
    return null;
};

export const validateMedia = (media, edit = false) => {
    // count check
    if (!edit && media.length == 0) {
        return "Upload your Image/Video First";
    }
    if (media.length > 10) {
        return "Too many files to upload! your max limit is 10";
    }

    if (edit && (!media.paths.length && media.mediaUrls.length === 0)) {
        return "Provide at least one media to edit with";
    }
}