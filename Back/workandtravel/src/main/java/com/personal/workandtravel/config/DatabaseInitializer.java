package com.personal.workandtravel.config;

import com.personal.workandtravel.entity.*;
import com.personal.workandtravel.repository.CommentRepository;
import com.personal.workandtravel.repository.JobRepository;
import com.personal.workandtravel.repository.ThreadRepository;
import com.personal.workandtravel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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
                "America",
                "39.045753",
                "76.641273",
                "Software Engineer",
                "1200",
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "077965446 whatsapp, 077965446 phone",
                images
        );

        JobEntity uk = new JobEntity(
                "Starbucks",
                "StarJobs@gmail.com",
                "United Kingdom",
                "35.045753",
                "72.641273",
                "Barista",
                "1000",
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "077962346 whatsapp, 077962346 phone",
                images2
        );

        JobEntity fr = new JobEntity(
                "Paris pool",
                "ParisPoolJobs@gmail.com",
                "France",
                "31.045753",
                "75.641273",
                "Life guard",
                "1100",
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012962346 whatsapp, 012962346 phone",
                images3
        );

        JobEntity pub = new JobEntity(
                "Popular pub",
                "PopularPublJobs@gmail.com",
                "United Kingdom",
                "35.445753",
                "72.941273",
                "Server",
                "700",
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012955346 whatsapp, 012955346 phone",
                images4
        );

        JobEntity accountant = new JobEntity(
                "TopMath",
                "TopMath@gmail.com",
                "United Kingdom",
                "32.445753",
                "71.941273",
                "Accountant",
                "1200",
                "GBP",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "012953346 whatsapp, 0129553346 phone",
                images5
        );

        JobEntity salesman = new JobEntity(
                "Sales",
                "SalesInc@gmail.com",
                "America",
                "35.445753",
                "72.941273",
                "salesman",
                "800",
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "012957746 whatsapp, 012957746 phone",
                images6
        );

        JobEntity cashier = new JobEntity(
                "Walmart",
                "WalmartEmploy@gmail.com",
                "America",
                "35.445753",
                "72.941273",
                "cashier",
                "1300",
                "USD",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                "018955346 whatsapp, 018955346 phone",
                images7
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

            // Generate random job data
            JobEntity job = new JobEntity(
                    "Job " + i,
                    "email" + i + "@example.com",
                    getRandomCountry(),
                    getRandomLatitude(),
                    getRandomLongitude(),
                    getRandomJobTitle(),
                    getRandomSalary(),
                    getRandomCountry().equals("United Kingdom") ? "GBP" : "USD",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras.",
                    getRandomContact(),
                    imagess
            );

            // Save the job to the repository
            jobRepository.save(job);
        }
    };

    public void threadConfig(){
        UserEntity author = userRepository.findById(1L).orElseThrow();


        ThreadEntity thread1 = new ThreadEntity();
        thread1.setAuthor(author);
        thread1.setThreadTitle("Thread 1");
        thread1.setThreadContent("This is the content of the first thread. Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

        ThreadEntity thread2 = new ThreadEntity();
        thread2.setAuthor(author);
        thread2.setThreadTitle("Thread 2");
        thread2.setThreadContent("This is the content of the second thread. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

        ThreadEntity thread3 = new ThreadEntity();
        thread3.setAuthor(author);
        thread3.setThreadTitle("Thread 3");
        thread3.setThreadContent("This is the content of the third thread. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");

        ThreadEntity thread4 = new ThreadEntity();
        thread4.setAuthor(author);
        thread4.setThreadTitle("Thread 4");
        thread4.setThreadContent("This is the content of the fourth thread. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

        threadRepository.saveAll(List.of(thread1, thread2, thread3, thread4));

        for (int i = 5; i <= 54; i++) {
            ThreadEntity thread = new ThreadEntity();
            thread.setAuthor(author);
            thread.setThreadTitle("Thread " + i);
            thread.setThreadContent("This is the content of Thread " + i + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
            threadRepository.save(thread);
        }

        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 1", 1L);

        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 2", 2L);
        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 3", 2L);

        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 4", 3L);
        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 5", 3L);
        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 6", 3L);

        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 7", 4L);

        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 8", 5L);
        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 9", 5L);

        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 10", 6L);
        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 11", 6L);
        jdbcTemplate.update("UPDATE image_entity SET thread_id = ? WHERE id = 12", 6L);
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
        comment1.setCommentContent("This is the first comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit sadasfbasbd abdhasbhdb ahbds basb aszb fzuasb gubauzsf zasbf uasb gziasbfiz bafzi bazif bauif iasnf iuasnugi a.");

        comment1 = commentRepository.save(comment1);

        UserEntity author2 = userRepository.findById(2L).orElseThrow();

        CommentEntity comment2  = new CommentEntity();
        comment2.setJob(job);
        comment2.setThread(null);
        comment2.setUser(author2);
        comment2.setParent(comment1);
        comment2.setDepth(comment1.getDepth()+1L);
        comment2.setUsername(author2.getUsername());
        comment2.setCommentContent("This is the reply to the first comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit sadasfbasbd abdhasbhdb ahbds basb aszb fzuasb gubauzsf zasbf uasb gziasbfiz bafzi bazif bauif iasnf iuasnugi a.");
        commentRepository.save(comment2);

        comment1.setChildren(List.of(comment2));
        commentRepository.save(comment1);

    }


    private static String getRandomCountry() {
        // Assuming you have a list of countries
        List<String> countries = Arrays.asList("America", "United Kingdom", "France");
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

    private static String getRandomSalary() {
        // Generate random salary (assuming it's within a certain range)
        Random random = new Random();
        int salary = 500 + random.nextInt(1000); // Range between 500 and 1500
        return String.valueOf(salary);
    }

    private static String getRandomContact() {
        // Generate random contact info (assuming it's within a certain range)
        Random random = new Random();
        return "0" + (random.nextInt(899999999) + 100000000) + " whatsapp, " + "0" + (random.nextInt(899999999) + 100000000) + " phone";
    }
}