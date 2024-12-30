import { Link } from "react-router-dom";
import { CodeBlockPreview } from "./CodeBlockPreview";

export function CodeBlockList({ codeBlocks }) {
    console.log(codeBlocks);

    return (
        <section>
            <h1>list</h1>
            {/* <CodeBlockPreview /> */}
            <ul>
                {codeBlocks.map(block => (

                    <Link to={`/editor/${block._id}`} key={block._id}>
                        <li>
                            <CodeBlockPreview block={block} />
                        </li>
                    </Link>
                )
                )}
            </ul>
        </section >
    )
}
