# Use Maven image with JDK 23 to build the Spring Boot app
FROM maven:3.9-eclipse-temurin-23 AS build

# Set the working directory
WORKDIR /app

# Copy Maven wrapper files and POM
COPY mvnw .
COPY .mvn/ .mvn/

# Ensure Maven wrapper is executable
RUN chmod +x mvnw

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN ./mvnw dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Use a JRE 23 image to run the application
FROM eclipse-temurin:23-jre

# Set the working directory
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
