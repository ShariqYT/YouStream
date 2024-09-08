"use client";

import { useState } from "react";

export const TagsInput = ({id, placeholder, charLimit = 500, changeValue, disabled }) => {
    const [tags, setTags] = useState([]);
    const [wordCount, setWordCount] = useState(0);

    const handleInput = () => {
        changeValue?.(id, tags);
    };

    const handleTagsChange = (newTags) => {
        console.log("Tags:", newTags);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
            e.preventDefault();
            addTag(e.target.value.trim());
        } else if (e.key === "Backspace" && !e.target.value) {
            removeTag(tags.length - 1);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const pastedTags = pastedData.split(",").map(tag => tag.trim()); // Split by comma and trim
        pastedTags.forEach(tag => addTag(tag));
    };

    const addTag = (tag) => {
        const tagChars = tag.length;
        if (tag && !tags.includes(tag) && (wordCount + tagChars) <= charLimit) {
            const newTags = [...tags, tag];
            setTags(newTags);
            setWordCount(wordCount + tagChars);
            handleTagsChange?.(newTags);
        }
    };

    const removeTag = (index) => {
        const removedTagChars = tags[index].length;
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        setWordCount(wordCount - removedTagChars);
        handleTagsChange?.(newTags);
    };

    return (
        <div>
            <div className="border border-gray-300 p-2 rounded-md flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-blue-100 text-[rgb(14,165,233)] px-2 py-1 rounded-full flex items-center">
                        {tag}
                        <button 
                            type="button" 
                            className="ml-2 text-[rgb(14,165,233)] hover:text-[rgb(14,165,233)] focus:outline-none"
                            onClick={() => removeTag(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                onInput={handleInput}
                    type="text"
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste} // Handle paste event
                    placeholder={placeholder}
                    className="border-none outline-none flex-grow"
                    disabled={wordCount >= charLimit || disabled}
                />
            </div>
            <p className="text-sm mt-2 text-right text-gray-500">
                {wordCount}/{charLimit} characters
            </p>
        </div>
    );
};
