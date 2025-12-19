export default function InfiniteScrollAnimation() {
    const imageURLs: string[] = [
        '/restaurant_logos/Bulb_cafe.svg',
        '/restaurant_logos/Velvet_cup.svg',
        '/restaurant_logos/Gulabi_thali.svg',
        '/restaurant_logos/Sirka.svg',
    ];

    return (
        <div className="overflow-hidden w-full flex">
            <ul className="flex gap-10 w-max animate-infinite-scroll">
                {[...imageURLs, ...imageURLs].map((imageURL, index) => (
                    <li
                        key={`${imageURL}-${index}`}
                        className="w-32 h-32 bg-center bg-contain bg-no-repeat"
                        style={{ backgroundImage: `url(${imageURL})` }}
                    />
                ))}
            </ul>
        </div>
    );
}
