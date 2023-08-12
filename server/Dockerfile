FROM golang:1.20 as builder

WORKDIR /app

ADD go.mod go.sum /app/
RUN go mod download

COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o casrestaurant .

FROM scratch
COPY --from=builder /app/casrestaurant .
COPY --from=builder /app/static ./static
COPY --from=builder /app/recipe ./recipe/

CMD ["./casrestaurant"]