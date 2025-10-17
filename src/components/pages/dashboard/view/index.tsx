import {Button, Card, Flex, Space, Typography} from "antd";
import {LanguagesIcon} from "lucide-react";
import {nanoid} from "nanoid";
import {useMemo} from "react";
import {useMediaQuery} from "react-responsive";

import {
    BgColorsOutlined,
    BookOutlined,
    ContactsOutlined,
    ExperimentOutlined,
    FolderOpenOutlined,
    MobileOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    ProductOutlined,
    RocketOutlined,
    ShopOutlined,
    SmileOutlined,
    SolutionOutlined,
} from "@ant-design/icons";

import {BrazilIcon, OutlookIcon, SpainIcon, TeamsIcon} from "../icons";

export function DashboardView() {
    const documentsData = [
        {
            title: "Documentos",
            icon: <FolderOpenOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.sharepoint.com/sites/Algetec-Comunicao/Shared%20Documents",
        },
        {
            title: "Glossário",
            icon: <BookOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.sharepoint.com/sites/Algetec-Comunicao/SitePages/Gloss%C3%A1rio.aspx",
        },
        {
            title: "Guia Labs. Mobile 1.0",
            icon: <MobileOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.sharepoint.com/sites/Algetec-Comunicao/SiteAssets/SitePages/CollabHome/FAQ---UALAB-para-desktop-e-android.pdf?web=1",
        },
        {
            title: "Identidade Visual +A",
            icon: <BgColorsOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.sharepoint.com/sites/Algetec-Comunicao/SiteAssets/SitePages/CollabHome/Manual---Identidade-Visual--A.pdf?web=1",
        },
        {
            title: "Catálogo v41 pt-BR",
            icon: <BrazilIcon style={{fontSize: "32px"}}/>,
            href: "https://grupoa-my.sharepoint.com/:x:/g/personal/engenharia3_algetec_com_br/ERe79qv1QZRGlRSSeKADhB0By12UR3u8smKhaBa27e_nsg?e=qopDIm",
        },
        {
            title: "Catálogo v40 ES",
            icon: <SpainIcon style={{fontSize: "32px"}}/>,
            href: "https://grupoa-my.sharepoint.com/:x:/g/personal/engenharia3_algetec_com_br/EVckG3DlgWVHniPJBwMourABgbS4yEDW9ivLfGgCRFTaQw?e=GQIzKJ",
        },
    ];

    const toolsData = [
        {
            title: "Algetec 1.0 (Launcher)",
            icon: <RocketOutlined style={{fontSize: "32px"}}/>,
            href: "https://algetec-es.grupoa.education/plataforma/lti-launch/?type=lti&id=2995499",
        },
        {
            title: "Algetec 1.0",
            icon: <ExperimentOutlined style={{fontSize: "32px"}}/>,
            href: "https://algetec-es.grupoa.education/plataforma/my-enrollments/courses",
        },
        {
            title: "Algetec 2.0",
            icon: <ExperimentOutlined style={{fontSize: "32px"}}/>,
            href: "https://algetec.grupoa.education/plataforma/",
        },
        {
            title: "Creator",
            icon: <PlusCircleOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.education/creator/",
        },
        {
            title: "Marketplace",
            icon: <ShopOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.education/marketplace/",
        },
        {
            title: "Traduções",
            icon: <LanguagesIcon style={{fontSize: "32px"}}/>,
            href: "/dashboard/translations",
        },
    ];

    const utilsData = [
        {
            title: "Benefícios +A",
            icon: <SmileOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.sharepoint.com/sites/ConectaComunicao/SitePages/home_beneficios.aspx",
        },
        {
            title: "Login +A",
            icon: <ContactsOutlined style={{fontSize: "32px"}}/>,
            href: "https://grupoa.sharepoint.com/sites/Algetec-Comunicao/Shared%20Documents/Internos%20(Tutoriais,%20docs,%20etc)/Logins%20+A.pdf?web=1",
        },
        {
            title: "Portal RH",
            icon: <SolutionOutlined style={{fontSize: "32px"}}/>,
            href: "https://login.lg.com.br/login/maisaedu",
        },
        {
            title: "Orquestra",
            icon: <ProductOutlined style={{fontSize: "32px"}}/>,
            href: "https://orquestra.artmed.com.br/login-legacy?r=93538118&inpLostSession=1&inpRedirectURL=%2Fmy%2Ftasks%3F",
        },
        {
            title: "Teams",
            icon: <TeamsIcon style={{fontSize: "32px"}}/>,
            href: "https://teams.microsoft.com/v2",
        },
        {
            title: "Outlook",
            icon: <OutlookIcon style={{fontSize: "32px"}}/>,
            href: "https://outlook.office.com/mail/",
        },
    ];

    const cardsData = [
        {
            title: "Bibliotecas e documentos",
            data: documentsData,
        },
        {
            title: "Ferramentas - Labs Virtuais",
            data: toolsData,
        },
        {
            title: "Links Úteis",
            data: utilsData,
        },
    ];

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
    const isTabletOrMobile = useMediaQuery({query: "(max-width: 1224px)"});
    const isMobile = useMediaQuery({query: "(max-width: 768px)"});

    const gridStyle: React.CSSProperties = useMemo(() => {
        const options: React.CSSProperties = {
            width: "calc(100% / 6)",
            textAlign: "center",
        };
        if (isDesktopOrLaptop || isBigScreen) {
            return options;
        }
        if (isMobile) {
            return {
                ...options,
                width: "50%",
            };
        }
        if (isTabletOrMobile) {
            return {
                ...options,
                width: "calc(100% / 3)",
            };
        }
        return options;
    }, [isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isMobile]);

    return (
        <Space direction="vertical" size="large">
            {cardsData.map((card) => (
                <Card
                    key={nanoid()}
                    title={card.title}
                    extra={<Button type="primary" icon={<PlusOutlined/>}/>}
                >
                    {card.data
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((item) => (
                            <Card.Grid
                                hoverable
                                style={gridStyle}
                                key={nanoid()}
                                className="relative"
                            >
                                <a href={item.href} rel="noreferrer" target="_blank">
                                    <Flex align="center" justify="center" vertical gap={16}>
                                        {item.icon}
                                        <Typography.Title level={5} className="text-center">
                                            {item.title}
                                        </Typography.Title>
                                    </Flex>
                                </a>
                            </Card.Grid>
                        ))}
                </Card>
            ))}
        </Space>
    );
}
