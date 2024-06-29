package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.*;
import com.personal.workandtravel.repository.CommentRepository;
import com.personal.workandtravel.repository.JobRepository;
import com.personal.workandtravel.repository.ThreadRepository;
import com.personal.workandtravel.repository.UserRepository;
import com.personal.workandtravel.service.CurrencyConversionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.money.convert.CurrencyConversion;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    JobRepository jobRepository;
    @Autowired
    ThreadRepository threadRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private CurrencyConversionService currencyConversionService;

    @Override
    public void run(String... args) {

        userConfig();
        jobConfig();
        threadConfig();
        commentConfig();

        System.out.println("Database initialized!");
    }

    public void userConfig() {
        UserEntity usr1 = new UserEntity(
                "user1",
                "smth@gmail.com",
                passwordEncoder.encode("123456")
        );

        UserEntity usr2 = new UserEntity(
                "user2",
                "smthelse@gmail.com",
                passwordEncoder.encode("password")
        );

        userRepository.saveAll(
                List.of(usr1, usr2)
        );
    }

    public void jobConfig() {
        JobEntity usa = new JobEntity(
                "sunnyholiday",
                "work@gmail.com",
                "United States",
                "39.045753",
                "-76.641273",
                "Software Engineer",
                1200,
                currencyConversionService.convertToUSD(1200, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "077965446 whatsapp, 077965446 phone",
                List.of(new ImageEntity("engineer", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity uk = new JobEntity(
                "Starbucks",
                "StarJobs@gmail.com",
                "United Kingdom",
                "35.045753",
                "-72.641273",
                "Barista",
                1000,
                currencyConversionService.convertToUSD(1000, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "077962346 whatsapp, 077962346 phone",
                List.of(new ImageEntity("foodServer", "1")), // Using List.of() for a single element
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity fr = new JobEntity(
                "Paris pool",
                "ParisPoolJobs@gmail.com",
                "France",
                "31.045753",
                "-75.641273",
                "Life guard",
                1100,
                currencyConversionService.convertToUSD(1100, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012962346 whatsapp, 012962346 phone",
                List.of(new ImageEntity("lifeguard", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity pub = new JobEntity(
                "Popular pub",
                "PopularPublJobs@gmail.com",
                "United Kingdom",
                "35.445753",
                "-72.941273",
                "Server",
                700,
                currencyConversionService.convertToUSD(700, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012955346 whatsapp, 012955346 phone",
                List.of(new ImageEntity("barman", "1")), // Using List.of() for a single element
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity accountant = new JobEntity(
                "TopMath",
                "TopMath@gmail.com",
                "United Kingdom",
                "32.445753",
                "-71.941273",
                "Accountant",
                1200,
                currencyConversionService.convertToUSD(1200, "GBP"),
                "GBP",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "012953346 whatsapp, 0129553346 phone",
                List.of(new ImageEntity("accountant", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity salesman = new JobEntity(
                "Sales",
                "SalesInc@gmail.com",
                "United States",
                "35.445753",
                "-72.941273",
                "salesman",
                800,
                currencyConversionService.convertToUSD(800, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012957746 whatsapp, 012957746 phone",
                List.of(new ImageEntity("salesman", "1")), // Using List.of() for a single element
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity cashier = new JobEntity(
                "Walmart",
                "WalmartEmploy@gmail.com",
                "United States",
                "35.445753",
                "-72.941273",
                "cashier",
                1300,
                currencyConversionService.convertToUSD(1300, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "018955346 whatsapp, 018955346 phone",
                List.of(new ImageEntity("maid", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity job8 = new JobEntity(
                "Software Developer",
                "softwaredev@example.com",
                "United States",
                "37.774929",
                "-122.419418",
                "Software Developer",
                1500,
                currencyConversionService.convertToUSD(1500, "USD"),
                "USD",
                "Join our dynamic team as a Software Developer and help build cutting-edge solutions for our clients worldwide.",
                "123-456-7890",
                List.of(new ImageEntity("engineer", "1")), // Using List.of() for a single element
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity job9 = new JobEntity(
                "Chef",
                "chefjobs@example.com",
                "France",
                "48.856613",
                "2.352222",
                "Chef",
                1800,
                currencyConversionService.convertToUSD(1800, "USD"),
                "USD",
                "Exciting opportunity for a talented Chef to showcase culinary skills in a renowned restaurant setting.",
                "987-654-3210",
                List.of(new ImageEntity("foodServer", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity job10 = new JobEntity(
                "Swimming Instructor",
                "swiminstructor@example.com",
                "United States",
                "34.052235",
                "-118.243683",
                "Swimming Instructor",
                1200,
                currencyConversionService.convertToUSD(1200, "USD"),
                "USD",
                "Passionate about swimming? Join us as a Swimming Instructor and teach the joy of swimming to all ages.",
                "555-123-4567",
                List.of(new ImageEntity("lifeguard", "1")), // Using List.of() for a single element
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity job11 = new JobEntity(
                "Bartender",
                "bartenderjobs@example.com",
                "United Kingdom",
                "51.507351",
                "-0.127758",
                "Bartender",
                900,
                currencyConversionService.convertToUSD(900, "USD"),
                "USD",
                "Seeking a skilled Bartender to craft delicious cocktails and provide exceptional service in a vibrant pub environment.",
                "321-654-9870",
                List.of(new ImageEntity("barman", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity job12 = new JobEntity(
                "Financial Analyst",
                "finanalyst@example.com",
                "United States",
                "40.712776",
                "-74.005974",
                "Financial Analyst",
                1600,
                currencyConversionService.convertToUSD(1600, "USD"),
                "USD",
                "Join our finance team as a Financial Analyst and drive strategic insights through comprehensive financial analysis.",
                "777-888-9999",
                List.of(new ImageEntity("accountant", "1")), // Using List.of() for a single element
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity job13 = new JobEntity(
                "Marketing Manager",
                "marketmanager@example.com",
                "United Kingdom",
                "51.507351",
                "-0.127758",
                "Marketing Manager",
                1400,
                currencyConversionService.convertToUSD(1400, "USD"),
                "USD",
                "Exciting opportunity for a dynamic Marketing Manager to lead innovative marketing campaigns and drive business growth.",
                "234-567-8901",
                List.of(new ImageEntity("salesman", "1")), // Using List.of() for a single element
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity job14 = new JobEntity(
                "Housekeeping Supervisor",
                "housekeepingsupervisor@example.com",
                "United States",
                "34.052235",
                "-118.243683",
                "Housekeeping Supervisor",
                1100,
                currencyConversionService.convertToUSD(1100, "USD"),
                "USD",
                "Join our team as a Housekeeping Supervisor and ensure cleanliness and comfort for our guests in a luxurious hotel setting.",
                "456-789-0123",
                List.of(new ImageEntity("maid", "1")), // Using List.of() for a single
                userRepository.findById(2L).orElseThrow()
        );

        // Save all predefined jobs
        jobRepository.saveAll(Arrays.asList(usa, uk, fr, pub, accountant, salesman, cashier, job8, job9, job10, job11, job12, job13, job14));

        // Generate 10 more predefined random jobs with proper names and descriptions
        List<JobEntity> additionalJobs = List.of(
                new JobEntity(
                        "Graphic Designer",
                        "graphicdesign@example.com",
                        "Canada",
                        "45.4215",
                        "-75.6919",
                        "Graphic Designer",
                        1400,
                        currencyConversionService.convertToUSD(1400, "CAD"),
                        "CAD",
                        "Creative Graphic Designer needed to bring innovative designs to life for our marketing campaigns.",
                        "111-222-3333",
                        List.of(new ImageEntity("designer", "1")),
                        userRepository.findById(1L).orElseThrow()
                ),
                new JobEntity(
                        "Project Manager",
                        "projectmanager@example.com",
                        "Australia",
                        "-33.8688",
                        "151.2093",
                        "Project Manager",
                        2000,
                        currencyConversionService.convertToUSD(2000, "AUD"),
                        "AUD",
                        "Experienced Project Manager required to oversee and coordinate complex projects within the IT sector.",
                        "444-555-6666",
                        List.of(new ImageEntity("manager", "1")),
                        userRepository.findById(2L).orElseThrow()
                ),
                new JobEntity(
                        "Data Scientist",
                        "datascientist@example.com",
                        "Germany",
                        "52.5200",
                        "13.4050",
                        "Data Scientist",
                        2500,
                        currencyConversionService.convertToUSD(2500, "EUR"),
                        "EUR",
                        "Join our analytics team as a Data Scientist and uncover insights from large datasets to drive strategic decisions.",
                        "777-888-9999",
                        List.of(new ImageEntity("scientist", "1")),
                        userRepository.findById(1L).orElseThrow()
                ),
                new JobEntity(
                        "UI/UX Designer",
                        "uiux@example.com",
                        "Japan",
                        "35.6895",
                        "139.6917",
                        "UI/UX Designer",
                        1800,
                        currencyConversionService.convertToUSD(1800, "JPY"),
                        "JPY",
                        "Talented UI/UX Designer needed to create intuitive and user-friendly interfaces for our mobile and web applications.",
                        "555-666-7777",
                        List.of(new ImageEntity("designer", "1")),
                        userRepository.findById(2L).orElseThrow()
                ),
                new JobEntity(
                        "Network Engineer",
                        "networkengineer@example.com",
                        "United States",
                        "40.7128",
                        "-74.0060",
                        "Network Engineer",
                        1900,
                        currencyConversionService.convertToUSD(1900, "USD"),
                        "USD",
                        "Skilled Network Engineer needed to maintain and optimize our company's network infrastructure.",
                        "888-999-0000",
                        List.of(new ImageEntity("engineer", "1")),
                        userRepository.findById(1L).orElseThrow()
                ),
                new JobEntity(
                        "Digital Marketing Specialist",
                        "digitalmarketing@example.com",
                        "India",
                        "28.7041",
                        "77.1025",
                        "Digital Marketing Specialist",
                        1300,
                        currencyConversionService.convertToUSD(1300, "INR"),
                        "INR",
                        "Creative Digital Marketing Specialist needed to develop and execute online marketing strategies to enhance brand presence.",
                        "222-333-4444",
                        List.of(new ImageEntity("marketer", "1")),
                        userRepository.findById(2L).orElseThrow()
                ),
                new JobEntity(
                        "System Administrator",
                        "sysadmin@example.com",
                        "United Kingdom",
                        "51.5074",
                        "-0.1278",
                        "System Administrator",
                        1700,
                        currencyConversionService.convertToUSD(1700, "GBP"),
                        "GBP",
                        "Experienced System Administrator needed to manage and maintain our IT systems and ensure optimal performance.",
                        "111-222-4444",
                        List.of(new ImageEntity("admin", "1")),
                        userRepository.findById(1L).orElseThrow()
                ),
                new JobEntity(
                        "Content Writer",
                        "contentwriter@example.com",
                        "United States",
                        "34.0522",
                        "-118.2437",
                        "Content Writer",
                        1200,
                        currencyConversionService.convertToUSD(1200, "USD"),
                        "USD",
                        "Talented Content Writer needed to create engaging and informative content for our blog and social media channels.",
                        "555-666-8888",
                        List.of(new ImageEntity("writer", "1")),
                        userRepository.findById(2L).orElseThrow()
                ),
                new JobEntity(
                        "HR Manager",
                        "hrmanager@example.com",
                        "Canada",
                        "43.651070",
                        "-79.347015",
                        "HR Manager",
                        2200,
                        currencyConversionService.convertToUSD(2200, "CAD"),
                        "CAD",
                        "Dynamic HR Manager needed to oversee recruitment, employee relations, and compliance within our organization.",
                        "999-888-7777",
                        List.of(new ImageEntity("hr", "1")),
                        userRepository.findById(1L).orElseThrow()
                ),
                new JobEntity(
                        "Customer Support Specialist",
                        "customersupport@example.com",
                        "Australia",
                        "-37.8136",
                        "144.9631",
                        "Customer Support Specialist",
                        1100,
                        currencyConversionService.convertToUSD(1100, "AUD"),
                        "AUD",
                        "Friendly and dedicated Customer Support Specialist needed to assist our customers and ensure satisfaction with our services.",
                        "123-456-7890",
                        List.of(new ImageEntity("support", "1")),
                        userRepository.findById(2L).orElseThrow()
                )
        );

        jobRepository.saveAll(additionalJobs);
    }

    public void threadConfig() {
        UserEntity author1 = userRepository.findById(1L).orElseThrow();
        UserEntity author2 = userRepository.findById(2L).orElseThrow();

        // Create initial threads
        ThreadEntity thread1 = ThreadEntity.builder()
                .author(author1)
                .threadTitle("Best Cities for Digital Nomads")
                .threadContent("Which cities around the world are the best for digital nomads? Share your experiences and recommendations.")
                .build();

        ThreadEntity thread2 = ThreadEntity.builder()
                .author(author2)
                .threadTitle("Remote Job Opportunities in Tech")
                .threadContent("Discuss the current job market for remote tech jobs. Any tips for finding remote work?")
                .build();

        ThreadEntity thread3 = ThreadEntity.builder()
                .author(author1)
                .threadTitle("Experience with Work Visas in Europe")
                .threadContent("Share your experiences obtaining work visas in European countries. What challenges did you face?")
                .build();

        ThreadEntity thread4 = ThreadEntity.builder()
                .author(author2)
                .threadTitle("Opinions on Working Holiday Programs")
                .threadContent("What are your opinions on working holiday programs? Which countries offer the best opportunities?")
                .build();

        threadRepository.saveAll(List.of(thread1, thread2, thread3, thread4));





        // Insert followed threads for user 1 for the first 4 threads
        for (int i = 1; i <= 4; i++) {
            jdbcTemplate.update("INSERT INTO followed_threads (thread_id, user_id) VALUES (?, ?)", i, 1L);
        }

        // Create new threads discussing jobs or experiences based on images
        String[] jobTitles = {
                "Software Developer at TechStart",
                "Graphic Designer at ArtWorks",
                "Data Analyst at DataDive",
                "Marketing Specialist at MarketMinds",
                "Project Manager at BuildCorp",
                "Content Writer at WriteRight",
                "Customer Support at HelpDesk",
                "Sales Executive at SellWell"
        };

        String[] jobContents = {
                "Discuss your experiences working as a Software Developer at TechStart. What technologies do you work with? Any tips for aspiring developers?",
                "Share your journey as a Graphic Designer at ArtWorks. What tools and techniques do you use? Any advice for beginners?",
                "As a Data Analyst at DataDive, what are the key skills and tools you use? How do you handle large datasets?",
                "What strategies have you found effective as a Marketing Specialist at MarketMinds? Share your success stories and challenges.",
                "Being a Project Manager at BuildCorp, what methodologies do you follow? How do you ensure project success?",
                "Discuss your role as a Content Writer at WriteRight. How do you generate engaging content? Any tips for improving writing skills?",
                "Share your experiences providing Customer Support at HelpDesk. What are the common challenges you face? How do you handle difficult customers?",
                "As a Sales Executive at SellWell, what techniques have helped you close deals? Share your tips for effective sales."
        };

        Random random = new Random();

        for (int i = 1; i <= jobTitles.length; i++) {
            UserEntity author = random.nextBoolean() ? author1 : author2;
            ThreadEntity thread = ThreadEntity.builder()
                    .author(author)
                    .threadTitle(jobTitles[i - 1])
                    .threadContent(jobContents[i - 1])
                    .build();

            threadRepository.save(thread);
        }

        // Update image_entity table for the first few threads (assuming you have ImageEntity objects)
        for (int i = 1; i <= 12; i++) {
            jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = ?", i, i);
        }
    }

    public void commentConfig(){
        UserEntity author = userRepository.findById(1L).orElseThrow();
        JobEntity job = jobRepository.findById(1L).orElseThrow();

        // Ensure the JobEntity is managed by re-fetching it from the repository
        job = jobRepository.findById(job.getId()).orElseThrow();

        CommentEntity comment1 = new CommentEntity();
        comment1.setJob(job);
        comment1.setThread(null);
        comment1.setUser(author);
        comment1.setParent(null);
        comment1.setDepth(0L);
        comment1.setUsername(author.getUsername());
        comment1.setCommentContent("I worked there last year, it was amazing I loved the vibe and my manager was such a nice person.");

        comment1 = commentRepository.save(comment1);

        UserEntity author2 = userRepository.findById(2L).orElseThrow();

        CommentEntity comment2  = new CommentEntity();
        comment2.setJob(job);
        comment2.setThread(null);
        comment2.setUser(author2);
        comment2.setParent(comment1);
        comment2.setDepth(comment1.getDepth()+1L);
        comment2.setUsername(author2.getUsername());
        comment2.setCommentContent("How was the pay? I'm considering applying.");
        commentRepository.save(comment2);

        CommentEntity comment3  = new CommentEntity();
        comment3.setJob(job);
        comment3.setThread(null);
        comment3.setUser(author);
        comment3.setParent(comment2);
        comment3.setDepth(comment2.getDepth()+1L);
        comment3.setUsername(author.getUsername());
        comment3.setCommentContent("The pay was decent, not the best but it was worth it for the experience.");

        comment1.setChildren(List.of(comment2));
        commentRepository.save(comment1);

    }

    private static int getRandomLikes() {
        Random random = new Random();
        return random.nextInt(401) ; // Range between -200 and 200
    }

    private static String getRandomCountry() {
        // Assuming you have a list of countries
        List<String> countries = Arrays.asList("United States", "China", "India", "Indonesia", "Pakistan",
                "Brazil", "Nigeria", "Bangladesh", "Russia", "Mexico",
                "Japan", "Ethiopia", "Philippines", "Egypt", "Vietnam",
                "Romania", "Turkey", "Iran", "Germany", "Thailand");
        Random random = new Random();

        return countries.get(random.nextInt(countries.size()));
    }

    private static String getRandomLatitude() {
        // Generate random latitude (assuming it's within a certain range)
        Random random = new Random();
        return String.valueOf(30 + random.nextDouble() * (50 - 30));
    }

    private static String getRandomLongitude() {
        // Generate random longitude (assuming it's within a certain range)
        Random random = new Random();
        return String.valueOf(70 + random.nextDouble() * (80 - 70));
    }

    private static String getRandomJobTitle() {
        // Assuming you have a list of job titles
        List<String> jobTitles = Arrays.asList("Software Engineer", "Barista", "Life guard", "Server", "Accountant", "Salesman", "Cashier");
        Random random = new Random();
        return jobTitles.get(random.nextInt(jobTitles.size()));
    }

    private static double getRandomSalary() {
        // Generate random salary (assuming it's within a certain range)
        Random random = new Random();
        double salary = 500 + random.nextInt(1000); // Range between 500 and 1500
        return salary;
    }

    private static String getRandomContact() {
        // Generate random contact info (assuming it's within a certain range)
        Random random = new Random();
        return "0" + (random.nextInt(899999999) + 100000000) + " whatsapp, " + "0" + (random.nextInt(899999999) + 100000000) + " phone";
    }
}