import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Progress,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import Brand from "components/Brand";
import FacebookIcon from "components/icons/Facebook";
import LinkedInIcon from "components/icons/LinkedIn";
import TwitterIcon from "components/icons/Twitter";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

const Landing = () => {
  return (
    <>
      <Head>
        <title>NextJS Auth</title>
      </Head>

      <Box scrollBehavior="smooth" bgColor="white">
        <Header />
        <Banner />
        <About />
        <Summary />
        <Catalog />
        <NewsLetterForm />
        <Staffs />
        <Sponsors />
        <Testimonials />
        <Thumbnails />
        <Contact />
        <Footer />
        <ScrollToTopButton />
      </Box>
    </>
  );
};

const ScrollToTopButton = () => {
  const [showScrollTopButton, setShowScollTopButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) setShowScollTopButton(true);
    else setShowScollTopButton(false);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setShowScollTopButton(false);
    };
  }, []);

  return (
    <>
      {showScrollTopButton && (
        <IconButton
          onClick={handleClick}
          icon={<Icon as={ChevronUpIcon} w={6} h={6} />}
          aria-label="scroll to top"
          pos="fixed"
          right={4}
          bottom={4}
          zIndex="toast"
          rounded="full"
          bgColor="brand.red"
          color="white"
          w={14}
          h={14}
          shadow="md"
          _hover={{ bg: "brand.red" }}
          _active={{ bg: "brand.red", boxShadow: "none" }}
        />
      )}
    </>
  );
};

const Footer = () => {
  return (
    <Box color="white">
      <SimpleGrid bg="black" columns={3} px={24} py={16} gap={12}>
        <VStack align="start" spacing={8}>
          <Brand dark />
          <Text fontWeight="light" fontSize="sm" color="brand.darkGray">
            This prodigiously grew tortoise charact stupidly pernicious jeepers
            along while accordingly under useful much salacious walking fars ...
          </Text>
        </VStack>

        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Contact Info
          </Text>

          <List fontSize="sm" color="brand.darkGray" mt={8} fontWeight="light">
            <ListItem>
              <ListIcon as={LocationMarkerIcon} color="brand.red" />
              BellSouth, Harley Street Florida 33968
            </ListItem>
            <ListItem>
              <ListIcon as={PhoneIcon} color="brand.red" />
              +(1) 234 567 8900
            </ListItem>
            <ListItem>
              <ListIcon as={MailIcon} color="brand.red" />
              info@demolink.com
            </ListItem>
          </List>

          <Wrap mt={8} align="center">
            <WrapItem>
              <Icon as={FacebookIcon} w={5} h={5} fill="white" />
            </WrapItem>
            <WrapItem>
              <Icon as={TwitterIcon} w={6} h={6} fill="white" />
            </WrapItem>
            <WrapItem>
              <Icon as={LinkedInIcon} w={6} h={6} fill="white" />
            </WrapItem>
          </Wrap>
        </Box>

        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Subscribe
          </Text>

          <Box mt={8}>
            <Input
              bgColor="white"
              placeholder="Enter Your E-mail...*"
              rounded="sm"
              border="none"
              fontWeight="light"
              p={6}
            />
            <Button
              mt={6}
              rounded="sm"
              bgColor="brand.red"
              textTransform="uppercase"
              color="white"
              fontSize="sm"
              py={6}
              px={12}
            >
              Join Now
            </Button>
          </Box>
        </Box>
      </SimpleGrid>

      <Flex bgColor="brand.yellow" justify="center">
        <Text fontSize="sm" fontWeight="light" p={3} color="black">
          2019 &copy; Shelter. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

const Contact = () => {
  return (
    <Box p={24} id="contact">
      <Center fontSize="xl" textTransform="uppercase" color="brand.red">
        Contacts
      </Center>
      <Center fontSize="6xl" fontWeight="bold">
        Let&apos;s Get In Touch
      </Center>

      <HStack spacing={8} mt={8} align="start">
        <VStack spacing={4} w="50%" align="start">
          <Input
            border="none"
            bg="brand.lightGray"
            padding={6}
            placeholder="Enter Your Name...*"
            rounded="sm"
          />
          <Input
            border="none"
            bg="brand.lightGray"
            padding={6}
            placeholder="Enter Your Email...*"
            rounded="sm"
          />
          <Input
            border="none"
            bg="brand.lightGray"
            padding={6}
            placeholder="Enter Your Phone...*"
            rounded="sm"
          />

          <Textarea
            border="none"
            bg="brand.lightGray"
            padding={6}
            placeholder="Message...*"
            rounded="sm"
            resize="none"
            rows={4}
          />

          <Button
            rounded="sm"
            bgColor="brand.red"
            textTransform="uppercase"
            color="white"
            fontSize="sm"
            py={6}
            px={12}
          >
            Send
          </Button>
        </VStack>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250818.76290033932!2d123.2701935484614!3d10.808005605387352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a8dd37c85ca45b%3A0xfbf4680f5dd377f8!2sSagay%20City%2C%20Negros%20Occidental!5e0!3m2!1sen!2sph!4v1647125545290!5m2!1sen!2sph"
          width="600"
          height="400"
          allowFullScreen
          loading="lazy"
        />
      </HStack>
    </Box>
  );
};

const Thumbnails = () => {
  return (
    <SimpleGrid p={8} gap={8} columns={4} id="gallery">
      <Box
        h="300px"
        bgImage="url(/images/grid/1.jpg)"
        bgPos="center"
        bgSize="cover"
      />

      <Flex flexDir="column" gap={8}>
        <Box
          h="50%"
          bgImage="url(/images/grid/3.jpg)"
          bgPos="center"
          bgSize="cover"
        />
        <Box
          h="50%"
          bgImage="url(/images/grid/2.jpg)"
          bgPos="center"
          bgSize="cover"
        />
      </Flex>

      <Box
        h="300px"
        bgImage="/images/grid/4.jpg"
        bgPos="center"
        bgSize="cover"
      />

      <Flex flexDir="column" gap={8}>
        <Box
          h="50%"
          bgImage="url(/images/grid/5.jpg)"
          bgPos="center"
          bgSize="cover"
        />
        <Box
          h="50%"
          bgImage="url(/images/grid/6.jpg)"
          bgPos="center"
          bgSize="cover"
        />
      </Flex>
    </SimpleGrid>
  );
};

const Testimonials = () => {
  return (
    <Box p={24}>
      <Center fontSize="xl" textTransform="uppercase" color="brand.red">
        About adopted pets
      </Center>
      <Center fontSize="6xl" fontWeight="bold">
        Success Stories
      </Center>

      <Box mt={8} pos="relative" maxW="container.sm" mx="auto">
        <IconButton
          pos="absolute"
          rounded="full"
          aria-label="previous slide"
          icon={<Icon as={ChevronLeftIcon} w={6} h={6} />}
          top="40%"
          left="-15%"
          bgColor="yellow.300"
          size="lg"
        />

        <Flex
          direction="column"
          align="center"
          fontSize="lg"
          fontWeight="light"
        >
          <Image src="/images/stories/1.png" alt="" />

          <Text mt={8}>
            When I saw her picture on the site, I knew she had found her home.
          </Text>
          <Text>
            She is a non-shedding bundle of cuteness affectionately known as.
          </Text>
          <Text>‘Lex”</Text>
        </Flex>

        <IconButton
          pos="absolute"
          top="40%"
          right="-15%"
          rounded="full"
          aria-label="next slide"
          icon={<Icon as={ChevronRightIcon} w={6} h={6} />}
          bgColor="yellow.300"
          size="lg"
        />
      </Box>
    </Box>
  );
};

const Sponsors = () => {
  return (
    <SimpleGrid
      bgImage="url(/images/gray-bg.png)"
      bgPos="bottom"
      bgSize="contain"
      bgRepeat="no-repeat"
      columns={6}
      gap={4}
      p={24}
      bgColor="brand.lightGray"
    >
      {Array(6)
        .fill(1)
        .map((v, i) => v + i)
        .map((n) => (
          <Box key={n}>
            <Image alt="" src={`/images/sponsors/${n}.png`} />
          </Box>
        ))}
    </SimpleGrid>
  );
};

const Staffs = () => {
  const items = [
    [
      "Shirley Green",
      "Founder",
      "Ms. Green is the Founder of Animal Shelter. Her passion for rescue developed as soon as she learned how many animals needed proper care.",
      "/images/members/founder.jpg",
    ],
    [
      "Amanda White",
      "Doctor",
      "Ralph White oversees all donations and finances of Animal Shelter. His work allows us to care about more and more animals every year.",
      "/images/members/doctor.jpg",
    ],
    [
      "Melissa Cox",
      "Financial Manager",
      "Melissa is responsible for managing the organization's public communications. She has more than ten years of marketing experience.",
      "/images/members/finance.jpg",
    ],
  ];

  return (
    <Box px={24} py={32}>
      <Center fontSize="xl" color="brand.red" textTransform="uppercase">
        Our Staff
      </Center>
      <Center fontSize="6xl" fontWeight="bold">
        Team of Professionals
      </Center>

      <SimpleGrid columns={3} gap={8} mt={24}>
        {items.map(([name, position, summary, src]) => (
          <Box key={name}>
            <Image src={src} alt="" />

            <Box mt={4}>
              <Text fontSize="xl" fontWeight="bold">
                {name}
              </Text>
              <Text fontWeight="light" fontSize="lg" color="brand.red">
                {position}
              </Text>
            </Box>

            <Text mt={4} fontWeight="light" color="gray.600" fontSize="sm">
              {summary}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const NewsLetterForm = () => {
  return (
    <Flex
      px={24}
      py={32}
      bgImage="url(/images/banner-2.jpg)"
      bgPos="top"
      bgSize="cover"
      bgRepeat="no-repeat"
      justify="end"
    >
      <Box maxW="45%">
        <Text
          fontSize="xl"
          textTransform="uppercase"
          color="brand.red"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="medium"
        >
          Join the newsletter
        </Text>
        <Text fontSize="50px" fontWeight="bold" color="white" lineHeight={1.2}>
          Stay Up To Date With All The Latest News!
        </Text>

        <Box mt={12} fontFamily="'Montserrat', sans-serif">
          <Input
            bgColor="white"
            placeholder="Enter Your E-mail...*"
            rounded="sm"
            border="none"
            fontWeight="light"
            p={6}
          />
          <Button
            mt={6}
            rounded="sm"
            bgColor="brand.red"
            textTransform="uppercase"
            color="white"
            fontSize="sm"
            py={6}
            px={12}
          >
            Join Now
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

const Catalog = () => {
  const items = [
    [
      "/images/gallery/1.jpg",
      "Lavender",
      "This beautiful cat had health issues her family couldn’t take care of, so she came to us...",
      "2.1 years old",
      "7 pounds",
    ],
    [
      "/images/gallery/2.jpg",
      "Moss",
      "Moss needed more time and attention than her caretaker could provide, so she was...",
      "2.5 years old",
      "5 pounds",
    ],
    [
      "/images/gallery/3.jpg",
      "Lavender",
      "As one of the oldest cats at our shelter, Nettle requires some special attention and...",
      "10 years old",
      "4 pounds",
    ],
    [
      "/images/gallery/4.jpg",
      "Princess",
      "This kitty was found as a stray and came to Animal Shelter to find a new home. People...",
      "2.1 years old",
      "6 pounds",
    ],
  ];

  const [active, setActive] = useState(0);

  return (
    <Box px={24} py={16}>
      <Box textAlign="center" maxW="container.md" mx="auto">
        <Text textTransform="uppercase" color="brand.red" fontSize="xl">
          Adopt Cats
        </Text>
        <Text fontWeight="bold" fontSize="6xl" lineHeight={1}>
          Bring a New Cat Home
        </Text>
        <Text fontWeight="light" fontSize="xl" mt={4} color="gray.600">
          Ensure your puppies get off to a great start with our company. Whether
          you are breeding your first litter or next &apos;Best in Show&apos;
          winner, we proudly support dedicated responsible dog breeders like
          you.
        </Text>
      </Box>

      <Center mt={14}>
        <Wrap textTransform="uppercase" spacing={8}>
          {"all cats.small.medium.large".split(/\./).map((label, idx) => {
            const isActive = idx === active;

            return (
              <WrapItem
                key={label}
                px={1}
                pb={2}
                borderBottom={isActive ? "2px" : ""}
                borderColor={isActive ? "brand.yellow" : ""}
                cursor="pointer"
                onClick={() => setActive(idx)}
              >
                {label}
              </WrapItem>
            );
          })}
        </Wrap>
      </Center>

      <SimpleGrid columns={4} mt={8} spacing={8}>
        {items.map(([src, name, description, age, weight]) => (
          <Flex direction="column" gap={4} key={src}>
            <Image src={src} alt="" />
            <Text fontSize="2xl" fontWeight="medium" lineHeight={1}>
              {name}
            </Text>
            <Text color="gray.600" fontWeight="light">
              {description}
            </Text>

            <List color="gray.600" fontWeight="light" fontSize="sm">
              <ListItem>
                <ListIcon as={CalendarIcon} color="brand.red" />
                {weight}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="brand.red" />
                {age}
              </ListItem>
            </List>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const Summary = () => {
  const items = [
    ["/images/icons/cat.png", 585, "Pets"],
    ["/images/icons/ribbon.png", 20, "Awards"],
    ["/images/icons/china-man.png", 100, "Staffers"],
  ] as const;

  return (
    <SimpleGrid px={24} columns={3} py={8} spacing={8} bg="brand.lightGray">
      {items.map(([src, count, label]) => (
        <VStack key={src} bgColor="white" shadow="sm" p={12} rounded="sm">
          <Image src={src} alt="" />
          <Text fontSize="5xl" fontWeight="bold" lineHeight={1}>
            {count}
          </Text>
          <Text fontSize="lg">{label}</Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
};

const Banner = () => {
  return (
    <Flex
      bgImage="url(/images/banner.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="top"
      color="white"
      flexDir="column"
      justify="center"
      px={24}
      py="200px"
    >
      <Flex top="50%" left="5%" maxW="50%" align="baseline" direction="column">
        <Box>
          <Text
            fontSize="2xl"
            fontWeight={600}
            textTransform="uppercase"
            lineHeight={1}
          >
            Animals Need
          </Text>
          <Text fontWeight="bold" fontSize="8xl" lineHeight={1.2}>
            Your Help!
          </Text>
        </Box>

        <HStack spacing={6} mt={8}>
          <Box w="3px" h={16} bgColor="white" />
          <Text fontSize="xl">
            You can chip in with money & effort! Cats, Dogs and Even Raccoons
            Adopt Any Pet You Like!
          </Text>
        </HStack>

        <Button
          mt={12}
          p={6}
          px={8}
          bgColor="brand.red"
          rounded="sm"
          textTransform="uppercase"
        >
          Donate Now
        </Button>
      </Flex>
    </Flex>
  );
};

const revealOnScrollUp = (elem: HTMLElement) => {
  let prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    elem.style.top = prevScrollpos > currentScrollPos ? "0" : "-100%";
    prevScrollpos = currentScrollPos;
  });
};

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { status } = useSession();

  const handleLogout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    signOut({ redirect: false });
  };

  useEffect(() => {
    const header = headerRef.current;
    if (header) revealOnScrollUp(header);
  }, []);

  return (
    <Flex
      ref={headerRef}
      px={24}
      py={4}
      gap={2}
      justify="space-between"
      align="center"
      shadow="md"
      zIndex="banner"
      pos="sticky"
      top={0}
      bg="white"
      transition="all"
      transitionDuration="300ms"
    >
      <Brand />

      <Wrap textTransform="uppercase" spacing={6}>
        <WrapItem>
          <a href="#gallery">Gallery</a>
        </WrapItem>
        <WrapItem>
          <a href="#contact">Contact</a>
        </WrapItem>
        <WrapItem>
          <a href="#about">About</a>
        </WrapItem>
        <WrapItem>
          {status === "loading" && <Box color="gray.400">Loading...</Box>}
          {status === "authenticated" && (
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          )}
          {status === "unauthenticated" && (
            <Link href="/login" passHref>
              <Box as="a">Login</Box>
            </Link>
          )}
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

const About = () => {
  return (
    <Flex p={24} align="center" id="about">
      <Image src="/images/poor-cat.jpg" alt="" />

      <Box p={12}>
        <Box>
          <Text fontSize="xl" textTransform="uppercase" color="brand.red">
            About Us
          </Text>
          <Text fontWeight={900} fontSize="6xl" lineHeight={1}>
            What Makes Us Care About Pets?
          </Text>

          <Text mt={6} fontWeight="light" color="gray.600" fontSize="lg">
            If it wasn’t for our founder’s childhood spent on a ranch in
            northern Texas, surrounded by domestic animals and pets all the time
            till she went to college – there might have been no Anilove animal
            shelter now. So as soon as she graduated with her Veterinary degree
            12 years ago, she already knew what she will be doing for a living.
          </Text>
        </Box>

        <Flex mt={10} fontWeight="light" gap={4} direction="column">
          {(
            [
              ["Animal care", 90],
              ["Pet Boarding", 80],
              ["Lost and found pets", 75],
            ] as const
          ).map(([label, value]) => {
            return (
              <Box key={label}>
                <Flex justify="space-between">
                  <Text>{label}</Text>
                  <Text>{value}%</Text>
                </Flex>

                <Progress
                  mt={1}
                  value={value}
                  rounded="md"
                  colorScheme="yellow"
                />
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Landing;
