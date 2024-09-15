import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"; 
import { NextResponse } from "next/server"; 

const isProtectedRoute = createRouteMatcher(["/"]); 

export default clerkMiddleware (async (auth, req) => { 
    const { userId, redirectToSignIn } = auth(); 
        
    // If the user isn't signed in and the route is private, redirect to sign-i 
    if (!userId && isProtectedRoute (req)) { 
        return redirectToSignIn({ returnBackUrl: "/" }); 
    } 
    
    // If the user is logged in and the route is protected, let them view. 
    if (userId && isProtectedRoute (req)) { 
        return NextResponse.next(); 
    }  
}); 

export const config = { 
    matcher: ["/((?!.*\\..*l_next).*)", "/", "/(api|trpc) (.*)"] 
};