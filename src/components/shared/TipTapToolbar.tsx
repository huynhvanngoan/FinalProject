import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button"; // Adjust the path based on your project structure.

interface TipTapToolbarProps {
    editor: Editor | null;
}

const TipTapToolbar: React.FC<TipTapToolbarProps> = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-300 bg-gray-100 rounded-t">
            {/* Bold */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
            >
                Bold
            </Button>

            {/* Italic */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
                Italic
            </Button>

            {/* Underline */}
            {/* <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
            >
                Underline
            </Button> */}

            {/* Heading Buttons */}
            {/* {[1, 2, 3].map((level) => (
                <Button
                    key={level}
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    disabled={!editor.can().chain().focus().toggleHeading({ level }).run()}
                >
                    H{level}
                </Button>
            ))} */}

            {/* Bullet List */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}
            >
                Bullet List
            </Button>

            {/* Ordered List */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            >
                Ordered List
            </Button>

            {/* Link */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                disabled={!editor.can().chain().focus().setLink({ href: "" }).run()}
            >
                Link
            </Button>

            {/* Image */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    const url = prompt("Enter Image URL");
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
            >
                Image
            </Button>

            {/* Text Color */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    const color = prompt("Enter color (e.g., #f00 or red)");
                    if (color) editor.chain().focus().setColor(color).run();
                }}
            >
                Text Color
            </Button>
        </div>
    );
};

export default TipTapToolbar;
