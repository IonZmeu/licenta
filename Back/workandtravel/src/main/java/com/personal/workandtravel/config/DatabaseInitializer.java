package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.*;
import com.personal.workandtravel.repository.CommentRepository;
import com.personal.workandtravel.repository.JobRepository;
import com.personal.workandtravel.repository.ThreadRepository;
import com.personal.workandtravel.repository.UserRepository;
import com.personal.workandtravel.service.CurrencyConversionService;
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
        List<ImageEntity> images = Arrays.asList(
                new ImageEntity("n1","1"),
                new ImageEntity("n2","0"),
                new ImageEntity("n3","0"),
                new ImageEntity("n4","0"),
                new ImageEntity("n5","0"),
                new ImageEntity("n6","0"),
                new ImageEntity("n7","0")
        );

        List<ImageEntity> images2 = List.of(
                new ImageEntity("n2", "1")
        );

        List<ImageEntity> images3 = List.of(
                new ImageEntity("n3", "1")
        );

        List<ImageEntity> images4 = List.of(
                new ImageEntity("n4", "1")
        );

        List<ImageEntity> images5 = List.of(
                new ImageEntity("n5", "1")
        );

        List<ImageEntity> images6 = List.of(
                new ImageEntity("n6", "1")
        );

        List<ImageEntity> images7 = List.of(
                new ImageEntity("n7", "1")
        );

        JobEntity usa = new JobEntity(
                "sunnyholiday",
                "work@gmail.com",
                "United States",
                "39.045753",
                "76.641273",
                "Software Engineer",
                1200,
                currencyConversionService.convertToUSD(1200, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "077965446 whatsapp, 077965446 phone",
                images,
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity uk = new JobEntity(
                "Starbucks",
                "StarJobs@gmail.com",
                "United Kingdom",
                "35.045753",
                "72.641273",
                "Barista",
                1000,
                currencyConversionService.convertToUSD(1000, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "077962346 whatsapp, 077962346 phone",
                images2,
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity fr = new JobEntity(
                "Paris pool",
                "ParisPoolJobs@gmail.com",
                "France",
                "31.045753",
                "75.641273",
                "Life guard",
                1100,
                currencyConversionService.convertToUSD(1100, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012962346 whatsapp, 012962346 phone",
                images3,
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity pub = new JobEntity(
                "Popular pub",
                "PopularPublJobs@gmail.com",
                "United Kingdom",
                "35.445753",
                "72.941273",
                "Server",
                700,
                currencyConversionService.convertToUSD(700, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012955346 whatsapp, 012955346 phone",
                images4,
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity accountant = new JobEntity(
                "TopMath",
                "TopMath@gmail.com",
                "United Kingdom",
                "32.445753",
                "71.941273",
                "Accountant",
                1200,
                currencyConversionService.convertToUSD(1200, "GBP"),
                "GBP",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "012953346 whatsapp, 0129553346 phone",
                images5,
                userRepository.findById(1L).orElseThrow()
        );

        JobEntity salesman = new JobEntity(
                "Sales",
                "SalesInc@gmail.com",
                "United States",
                "35.445753",
                "72.941273",
                "salesman",
                800,
                currencyConversionService.convertToUSD(800, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012957746 whatsapp, 012957746 phone",
                images6,
                userRepository.findById(2L).orElseThrow()
        );

        JobEntity cashier = new JobEntity(
                "Walmart",
                "WalmartEmploy@gmail.com",
                "United States",
                "35.445753",
                "72.941273",
                "cashier",
                1300,
                currencyConversionService.convertToUSD(1300, "USD"),
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "018955346 whatsapp, 018955346 phone",
                images7,
                userRepository.findById(1L).orElseThrow()
        );

        jobRepository.saveAll(
                List.of(usa,uk,fr,pub,accountant,salesman,cashier)
        );

        Random random = new Random();

        for (int i = 0; i < 20; i++) {
            List<ImageEntity> imagess = new ArrayList<>();

            // Generate random number of images for each job
            int numImages = random.nextInt(5) + 1; // Generate a number between 1 and 5
            boolean hasType1Image = false;
            for (int j = 0; j < numImages; j++) {
                String imageType = (hasType1Image || (random.nextBoolean() && !hasType1Image)) ? "0" : "1";
                if (imageType.equals("1")) {
                    hasType1Image = true;
                }
                imagess.add(new ImageEntity("n" + (j + 1), imageType));
            }

            // Generate one image of type 1 if not already present
            if (!hasType1Image) {
                int randomIndex = random.nextInt(numImages);
                imagess.get(randomIndex).setImageType("1");
            }
            double salary = getRandomSalary();
            String country = getRandomCountry();
            String currency = country.equals("United Kingdom") ? "GBP" : "USD";
            // Generate random job data
            JobEntity job = new JobEntity(
                    "Job " + i,
                    "email" + i + "@example.com",
                    country,
                    getRandomLatitude(),
                    getRandomLongitude(),
                    getRandomJobTitle(),
                    salary,
                    currencyConversionService.convertToUSD(salary, currency),
                    currency,
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                    getRandomContact(),
                    imagess,
                    userRepository.findById((i % 2) + 1L).orElseThrow()
            );

            // Save the job to the repository
            jobRepository.save(job);
        }
    };

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

        // Generate additional threads
        Random random = new Random();
        for (int i = 5; i <= 50; i++) {
            UserEntity author = random.nextBoolean() ? author1 : author2;
            ThreadEntity thread = ThreadEntity.builder()
                    .author(author)
                    .threadTitle("Thread " + i)
                    .threadContent("This is the content of Thread " + i + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .build();
            threadRepository.save(thread);
        }

        // Update image_entity table for the first few threads (assuming you have ImageEntity objects)
        for (int i = 1; i <= 12; i++) {
            jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = ?", i, i);
        }

        // Insert followed threads for user 1 for the first 4 threads
        for (int i = 1; i <= 4; i++) {
            jdbcTemplate.update("INSERT INTO followed_threads (thread_id, user_id) VALUES (?, ?)", i, 1L);
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