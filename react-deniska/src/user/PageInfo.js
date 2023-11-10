import './PageInfo.css'
import {useState} from "react";

function PageInfo() {

    const [cze, setCze] = useState(true)
    const [isZoomedOne, setIsZoomedOne] = useState(false);
    const [isZoomedTwo, setIsZoomedTwo] = useState(false);

    function selectLanguage() {
        setCze(!cze)
    }

    const toggleZoomOne = () => {
        setIsZoomedOne(!isZoomedOne);
        setIsZoomedTwo(false);
    };

    const toggleZoomTwo = () => {
        setIsZoomedTwo(!isZoomedTwo);
        setIsZoomedOne(false);
    };


    return (
        <>
            <div id={'language-info '}>
                <div id={'language-selector'}>
                    <div className={'selector'} id={'language-cze'} onClick={selectLanguage}></div>
                </div>
                {cze ? (
                    <div id="info-info">
                        <p>
                            Ahoj,
                        </p>
                        <p>
                            Jmenuji se Václav Vlček a jsem vývojář webových aplikací.
                        </p>
                        <p>
                            Na této stránce jsem vytvořil webovou aplikaci pro svou přítelkyni, kde si může ukládat a
                            spravovat své grafické portfolio.
                        </p>
                        <p>
                            Aplikace je postavena na Reactu a Node.js ve spojení s Java na backendové straně, využívá
                            framework Spring Boot a komunikuje s MySQL databází pomocí Hibernate.
                        </p>
                        <p>
                            Obsahuje rozsáhlý systém správy stránky, který umožňuje přidávat obrázky, odpovídat na
                            komentáře, měnit profilovou fotku, pozadí stránky, přidávat nové fotky do kategorií,
                            vytvářet
                            nové kategorie a mnohem více.
                        </p>
                        <p>
                            Všechny tyto funkce jsou přístupné prostřednictvím intuitivního rozhraní, které nevyžaduje
                            žádné
                            znalosti programování.
                        </p>
                        <div id="info-img">
                            <div
                                className={`info-img-one ${isZoomedOne ? 'zoomed' : ''}`}
                                style={{ backgroundImage: 'url("https://1iq.cz/img/x8yPS/4ueKn.jpg")' }}
                                onClick={toggleZoomOne}
                            ></div>
                            <div
                                className={`info-img-two ${isZoomedTwo ? 'zoomed' : ''}`}
                                style={{ backgroundImage: 'url("https://1iq.cz/img/x8yPS/5E3gm.jpg")' }}
                                onClick={toggleZoomTwo}
                            ></div>
                        </div>
                        <p>
                            Jedná se o mou první webovou aplikaci, na které jsem pracoval. Získal jsem při její tvorbě
                            mnoho
                            poznatků a zkušeností. I když bych nyní provedl některé věci jinak a lépe, jsem na ni hrdý a
                            jsem rád, že ji mohu prezentovat.
                        </p>
                        <p>
                            Pokud máte zájem o spolupráci nebo chcete vidět další mé projekty, neváhejte kliknout na
                            odkazy
                            výše.
                        </p>
                    </div>
                ) : (
                    <div id="info-info">
                        <p>
                            Hello,
                        </p>
                        <p>
                            My name is Václav Vlček, and I am a web application developer.
                        </p>
                        <p>
                            On this page, I have created a web application for my girlfriend, where she can save and
                            manage
                            her graphic portfolio.
                        </p>
                        <p>
                            The application is built on React and Node.js, coupled with Java on the backend, using the
                            Spring Boot framework and communicating with a MySQL database using Hibernate.
                        </p>
                        <p>
                            It includes an extensive page management system that allows adding images, responding to
                            comments, changing profile pictures, page backgrounds, adding new photos to categories,
                            creating
                            new categories, and much more.
                        </p>
                        <p>
                            All these features are accessible through an intuitive interface that doesn't require any
                            programming knowledge.
                        </p>
                        <div id="info-img">
                            <div
                                className={`info-img-one ${isZoomedOne ? 'zoomed' : ''}`}
                                style={{ backgroundImage: 'url("https://1iq.cz/img/x8yPS/4ueKn.jpg")' }}
                                onClick={toggleZoomOne}
                            ></div>
                            <div
                                className={`info-img-two ${isZoomedTwo ? 'zoomed' : ''}`}
                                style={{ backgroundImage: 'url("https://1iq.cz/img/x8yPS/5E3gm.jpg")' }}
                                onClick={toggleZoomTwo}
                            ></div>
                        </div>
                        <p>
                            This is my first web application that I have worked on. I have gained a lot of knowledge and
                            experience during its creation. Although I would now do some things differently and better,
                            I am
                            proud of it and glad to present it.
                        </p>
                        <p>
                            If you are interested in collaboration or want to see more of my projects, feel free to
                            click on
                            the links above.
                        </p>
                    </div>
                )}
            </div>
            <div id={'free-space'}></div>
        </>
    )
}

export default PageInfo