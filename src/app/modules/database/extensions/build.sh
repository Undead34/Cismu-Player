cp -a uuid.c ./sqlite3/uuid.c
gcc -g -fPIC -shared ./sqlite3/uuid.c -o uuid.so
# Macs are unix-like, but they do not follow the usual shared library conventions. To compile a shared library on a Mac, use a command like this:
# gcc -g -fPIC -dynamiclib ./sqlite3/uuid.c -o uuid.dylib
# If when you try to load your library you get back an error message that says "mach-o, but wrong architecture" then you might need to add command-line options "-arch i386" or "arch x86_64" to gcc, depending on how your application is built.
# gcc -g -DBUILD_DLL -shared ./sqlite3/uuid.c -o uuid.dll