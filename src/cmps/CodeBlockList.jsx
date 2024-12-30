import { Link } from "react-router-dom";
import { CodeBlockPreview } from "./CodeBlockPreview";

export function CodeBlockList({ codeBlocks }) {
    console.log(codeBlocks);

    return (

        <ul className="clean-list">
            {codeBlocks.map(block => (

                <Link to={`/editor/${block._id}`} key={block._id}>
                    <li>
                        <CodeBlockPreview block={block} />
                    </li>
                </Link>
            )
            )}
        </ul>

    )
}
