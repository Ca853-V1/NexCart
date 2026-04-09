type FeatureCardProps = {
    img: string;
    col: string;
    row?: string
};

function FeatureCard({ img, col, row }: FeatureCardProps)
{
    return (<div className={`${col} ${row ?? ""} rounded-xl overflow-hidden bg-slate-300 dark:bg-slate-700 transform-gpu transition-transform transition-shadow duration-150 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl will-change-transform isolate contain-layout`}>
                <img src={img} alt="featured items" className="w-full h-full object-cover pointer-events-none select-none" draggable={false}/>
            </div>);
}

function SectionImage()
{
    return (
        <section className="px-2 py-2">
            <div className="grid grid-rows-[220px_220px] gap-2 max-w-7.5xl mx-auto" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
                <FeatureCard img="/homeimage/1.jpg" col="col-span-4 col-start-1" row="row-span-2"/>
                <FeatureCard img="/homeimage/2.jpg" col="col-span-6 col-start-5"/>
                <FeatureCard img="/homeimage/4.jpg" col="col-span-6 col-start-5 row-start-2"/>
                <FeatureCard img="/homeimage/3.jpg" col="col-span-4 col-start-11" row="row-span-2"/>
                <FeatureCard img="/homeimage/6.jpg" col="col-span-6 col-start-15"/>
                <FeatureCard img="/homeimage/7.jpg" col="col-span-6 col-start-15 row-start-2"/>
                <FeatureCard img="/homeimage/5.jpg" col="col-span-4 col-start-21" row="row-span-2"/>
            </div>
        </section>
    );
}

export default SectionImage;