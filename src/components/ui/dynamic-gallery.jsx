import { LayoutGrid } from "./gallery/layout-grid";

export default function DynamicGallery({ data }) {
    let cards = [];

    const patterns = [
        ["md:col-span-2", "col-span-1"],
        ["col-span-1", "md:col-span-2"],
    ];

    
    for(let i = 0; i < data.length; i++) {
        const rowPattern = patterns[parseInt(i / 2) % patterns.length];
        const className = rowPattern[i % 2 === 0 ? 0 : 1];

        const Skeleton = () => {
            return (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">${data[i].title}</p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                        ${data[i].description}
                    </p>
                </div>
            )
        }

        cards[i] = {
            id: i + 1,
            content: <Skeleton />,
            className: className,
            thumbnail: data[i].image,
        }
    }

    return (
        <div className="min-h-screen py-20 w-full">
            <LayoutGrid cards={cards} />
        </div>
    );
}