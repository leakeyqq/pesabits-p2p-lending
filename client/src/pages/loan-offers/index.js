'use client'

import { useState } from 'react'
import { Bell, Calculator, CreditCard, FileText, LayoutDashboard, MessageSquare, Settings, Users, Wallet, Eye } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Dashboard from '@/components/@layouts/dashboard-layout'

export default function LoanOffers(){
    const [isWalletConnected, setIsWalletConnected] = useState(false)

    const handleConnectWallet = () => {
      setIsWalletConnected(true)
    }
  
    const loanOffers = [
      { id: 1, lender: "Lender A", amount: 25000, interestRate: 5.5, term: 12, collateralRequired: "BTC", status: "active" },
      { id: 2, lender: "Lender B", amount: 15000, interestRate: 6.0, term: 6, collateralRequired: "ETH", status: "active" },
      { id: 3, lender: "Lender C", amount: 50000, interestRate: 4.8, term: 24, collateralRequired: "USDC", status: "pending" },
      { id: 4, lender: "Lender D", amount: 10000, interestRate: 7.0, term: 3, collateralRequired: "BTC", status: "active" },
      { id: 5, lender: "Lender E", amount: 30000, interestRate: 5.2, term: 18, collateralRequired: "ETH", status: "active" },
    ]

    return (
        <Dashboard>
            <Card>
                <CardHeader>
                    <CardTitle>Available Loan Offers</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lender</TableHead>
                            <TableHead>Amount (USD)</TableHead>
                            <TableHead>Interest Rate (%)</TableHead>
                            <TableHead>Term (months)</TableHead>
                            <TableHead>Collateral Required</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loanOffers.map((offer) => (
                            <TableRow key={offer.id}>
                            <TableCell>{offer.lender}</TableCell>
                            <TableCell>${offer.amount.toLocaleString()}</TableCell>
                            <TableCell>{offer.interestRate}%</TableCell>
                            <TableCell>{offer.term}</TableCell>
                            <TableCell>{offer.collateralRequired}</TableCell>
                            <TableCell>
                                <Badge variant={offer.status === 'active' ? 'success' : 'secondary'}>
                                {offer.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                    <DialogTitle>Loan Offer Details</DialogTitle>
                                    <DialogDescription>
                                        Review the details of this loan offer.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold">Lender</h4>
                                        <p>{offer.lender}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Loan Amount</h4>
                                        <p>${offer.amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Interest Rate</h4>
                                        <p>{offer.interestRate}% per annum</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Loan Term</h4>
                                        <p>{offer.term} months</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Collateral Required</h4>
                                        <p>{offer.collateralRequired}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Status</h4>
                                        <Badge variant={offer.status === 'active' ? 'success' : 'secondary'}>
                                        {offer.status}
                                        </Badge>
                                    </div>
                                    </div>
                                    <Button className="w-full mt-4 bg-[#6366F1] hover:bg-[#5355d1] text-white">
                                    Accept Offer
                                    </Button>
                                </DialogContent>
                                </Dialog>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </Dashboard>
    )
}