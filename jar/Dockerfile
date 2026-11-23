FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "target/jar-0.0.1-SNAPSHOT.jar"]