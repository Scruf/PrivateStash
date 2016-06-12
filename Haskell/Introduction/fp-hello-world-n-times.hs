print_hello _ = putStrLn "Hello World"
hello_worlds n = mapM print_hello[1..n]
main = do
     n <-readLn :: IO Int
     hello_worlds n 
